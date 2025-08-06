use tauri::{Manager, WebviewWindowBuilder, WebviewUrl, Emitter};
use std::io::prelude::*;
use std::net::TcpListener;
use std::thread;

#[tauri::command]
pub async fn open_discord_auth(app_handle: tauri::AppHandle) -> Result<(), String> {
    let client_id = "1343973578650943579";
    let redirect_uri = "http://localhost:8080/callback";
    let scope = "identify";

    // Iniciar servidor local
    start_simple_server(app_handle.clone());

    let auth_url = format!(
        "https://discord.com/oauth2/authorize?client_id={}&response_type=token&redirect_uri={}&scope={}", 
        client_id, 
        urlencoding::encode(redirect_uri), 
        scope
    );

    let _auth_window = WebviewWindowBuilder::new(
        &app_handle,
        "discord-auth",
        WebviewUrl::External(auth_url.parse().unwrap())
    )
    .title("Discord Auth")
    .inner_size(500.0, 700.0)
    .center()
    .resizable(false)
    .build()
    .map_err(|e| e.to_string())?;

    Ok(())
}

fn start_simple_server(app_handle: tauri::AppHandle) {
    thread::spawn(move || {
        println!("Servidor iniciado na porta 8080");
        if let Ok(listener) = TcpListener::bind("127.0.0.1:8080") {
            for stream in listener.incoming() {
                if let Ok(mut stream) = stream {
                    let mut buffer = [0; 2048];
                    if stream.read(&mut buffer).is_ok() {
                        let request = String::from_utf8_lossy(&buffer[..]);
                        
                        if let Some(line) = request.lines().next() {
                            println!("Requisição recebida: {}", line);
                            if line.contains("GET /callback") {
                                println!("Servindo página de callback");
                                // Servir página que vai capturar o token do hash
                                let response = r#"HTTP/1.1 200 OK
Content-Type: text/html
Connection: close

<!DOCTYPE html>
<html>
<head>
    <title>Autenticação Concluída</title>
    <meta charset='utf-8'>
</head>
<body style='font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #36393f; color: white; margin: 0;'>
    <div style='max-width: 400px; margin: 0 auto; padding: 30px; background: #2f3136; border-radius: 10px;'>
        <h1>✅ Autenticação Concluída!</h1>
        <p>Processando autenticação...</p>
        <p id="status" style='font-size: 12px; opacity: 0.7;'>Aguarde...</p>
    </div>
    <script>
        function processToken() {
            console.log('Processando token...');
            console.log('URL atual:', window.location.href);
            console.log('Hash:', window.location.hash);
            
            const hash = window.location.hash.substring(1);
            if (hash) {
                const params = new URLSearchParams(hash);
                const accessToken = params.get('access_token');
                const tokenType = params.get('token_type');
                
                console.log('Access Token:', accessToken);
                console.log('Token Type:', tokenType);
                
                if (accessToken && tokenType) {
                    document.getElementById('status').textContent = 'Enviando token...';
                    
                    // Enviar token para o servidor via POST
                    fetch('/token', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            access_token: accessToken,
                            token_type: tokenType
                        })
                    }).then(response => {
                        console.log('Resposta do servidor:', response.status);
                        document.getElementById('status').textContent = 'Autenticação concluída! Fechando...';
                        
                        // Fechar imediatamente
                        window.close();
                    }).catch(error => {
                        console.error('Erro ao enviar token:', error);
                        document.getElementById('status').textContent = 'Erro ao processar token';
                    });
                } else {
                    document.getElementById('status').textContent = 'Token não encontrado';
                    console.log('Token ou tipo não encontrado');
                }
            } else {
                document.getElementById('status').textContent = 'Sem dados de autenticação';
                console.log('Sem hash na URL');
            }
        }
        
        // Executar quando a página carrega
        window.addEventListener('load', processToken);
        // E também imediatamente
        processToken();
    </script>
</body>
</html>"#;
                                
                                let _ = stream.write_all(response.as_bytes());
                            } else if line.contains("POST /token") {
                                println!("Processando POST /token");
                                
                                // Encontrar Content-Length para ler o corpo corretamente
                                let mut content_length = 0;
                                for line in request.lines() {
                                    if line.to_lowercase().starts_with("content-length:") {
                                        if let Some(len_str) = line.split(':').nth(1) {
                                            content_length = len_str.trim().parse().unwrap_or(0);
                                        }
                                        break;
                                    }
                                }
                                
                                // Encontrar onde o corpo começa
                                if let Some(body_start) = request.find("\r\n\r\n") {
                                    let body_start = body_start + 4;
                                    let body = &request[body_start..];
                                    
                                    // Pegar apenas o tamanho correto do corpo
                                    let body = if content_length > 0 && body.len() >= content_length {
                                        &body[..content_length]
                                    } else {
                                        // Fallback: pegar até o primeiro null byte ou fim da string
                                        body.trim_end_matches('\0').trim()
                                    };
                                    
                                    println!("Corpo da requisição (length: {}): '{}'", body.len(), body);
                                    
                                    // Tentar fazer parse do JSON
                                    match serde_json::from_str::<serde_json::Value>(body) {
                                        Ok(json) => {
                                            println!("JSON parseado com sucesso: {:?}", json);
                                            
                                            if let (Some(access_token), Some(token_type)) = (
                                                json.get("access_token").and_then(|v| v.as_str()),
                                                json.get("token_type").and_then(|v| v.as_str())
                                            ) {
                                                let formatted_token = format!("{} {}", token_type, access_token);
                                                println!("Token formatado: {}", formatted_token);
                                                
                                                // Emitir evento
                                                if let Err(e) = app_handle.emit("discord-oauth-code", &formatted_token) {
                                                    println!("Erro ao emitir evento: {:?}", e);
                                                } else {
                                                    println!("Evento emitido com sucesso");
                                                }
                                                
                                                // Fechar janela após delay
                                                std::thread::sleep(std::time::Duration::from_millis(500));
                                                
                                                if let Some(auth_win) = app_handle.get_webview_window("discord-auth") {
                                                    let _ = auth_win.close();
                                                }
                                            }
                                        }
                                        Err(e) => {
                                            println!("Erro ao fazer parse do JSON: {:?}", e);
                                            println!("Conteúdo que falhou: '{}'", body);
                                            // Debug: mostrar bytes do conteúdo
                                            println!("Bytes: {:?}", body.as_bytes());
                                        }
                                    }
                                }
                                
                                let response = "HTTP/1.1 200 OK\r\nContent-Type: application/json\r\nConnection: close\r\n\r\n{\"status\":\"ok\"}";
                                let _ = stream.write_all(response.as_bytes());
                            }
                        }
                    }
                }
            }
        } else {
            println!("Erro ao iniciar servidor na porta 8080");
        }
    });
}

#[tauri::command]
pub async fn close_auth_window(app_handle: tauri::AppHandle) -> Result<(), String> {
    if let Some(window) = app_handle.get_webview_window("discord-auth") {
        window.close().map_err(|e| e.to_string())?;
    }
    Ok(())
}