#!/usr/bin/env -S deno run --allow-read --allow-write --allow-run

async function updateVersion(newVersion: string) {
  const filesToUpdate = [
    { file: "package.json", description: "package.json" },
    { file: "deno.json", description: "deno.json" },
    { file: "src-tauri/Cargo.toml", description: "src-tauri/Cargo.toml" },
    { file: "src-tauri/tauri.conf.json", description: "src-tauri/tauri.conf.json" }
  ];

  const updatedFiles: string[] = [];
  const failedFiles: string[] = [];

  // 1. Atualizar package.json
  try {
    const packageJson = JSON.parse(await Deno.readTextFile("package.json"));
    packageJson.version = newVersion;
    await Deno.writeTextFile("package.json", JSON.stringify(packageJson, null, 2));
    updatedFiles.push("package.json");
  } catch (error: any) {
    failedFiles.push(`package.json: ${error.message}`);
  }

  // 2. Atualizar deno.json
  try {
    const denoConfig = JSON.parse(await Deno.readTextFile("deno.json"));
    denoConfig.version = newVersion;
    await Deno.writeTextFile("deno.json", JSON.stringify(denoConfig, null, 2));
    updatedFiles.push("deno.json");
  } catch (error: any) {
    failedFiles.push(`deno.json: ${error.message}`);
  }

  // 3. Atualizar src-tauri/Cargo.toml
  try {
    const cargoToml = await Deno.readTextFile("src-tauri/Cargo.toml");
    const updatedCargoToml = cargoToml.replace(
      /version = "[^"]*"/,
      `version = "${newVersion}"`
    );
    await Deno.writeTextFile("src-tauri/Cargo.toml", updatedCargoToml);
    updatedFiles.push("src-tauri/Cargo.toml");
  } catch (error: any) {
    failedFiles.push(`src-tauri/Cargo.toml: ${error.message}`);
  }

  // 4. Atualizar src-tauri/tauri.conf.json
  try {
    const tauriConfig = JSON.parse(await Deno.readTextFile("src-tauri/tauri.conf.json"));
    tauriConfig.version = newVersion;
    await Deno.writeTextFile("src-tauri/tauri.conf.json", JSON.stringify(tauriConfig, null, 2));
    updatedFiles.push("src-tauri/tauri.conf.json");
  } catch (error: any) {
    failedFiles.push(`src-tauri/tauri.conf.json: ${error.message}`);
  }

  // Relatório de resultados
  console.log(`✅ Versão atualizada para ${newVersion}`);
  
  if (updatedFiles.length > 0) {
    console.log("📝 Arquivos atualizados com sucesso:");
    updatedFiles.forEach(file => console.log(`   ✓ ${file}`));
  }
  
  if (failedFiles.length > 0) {
    console.log("⚠️ Arquivos que falharam:");
    failedFiles.forEach(file => console.log(`   ✗ ${file}`));
  }
  
  console.log("");
  console.log("🚀 Para fazer release:");
  console.log(`   git add . && git commit -m "bump: v${newVersion}"`);
  console.log(`   git tag v${newVersion}`);
  console.log(`   git push origin v${newVersion}`);
  
  // Se algum arquivo falhou, não considere como erro fatal
  // desde que pelo menos um arquivo foi atualizado
  if (updatedFiles.length === 0) {
    throw new Error("Nenhum arquivo foi atualizado com sucesso");
  }
}

async function getCurrentVersion(): Promise<string> {
  try {
    const packageJson = JSON.parse(await Deno.readTextFile("package.json"));
    return packageJson.version;
  } catch (error: any) {
    throw new Error(`Erro ao ler versão atual: ${error.message}`);
  }
}

function bumpVersion(currentVersion: string, type: 'major' | 'minor' | 'patch'): string {
  const versionParts = currentVersion.split('.');
  
  if (versionParts.length !== 3) {
    throw new Error(`Formato de versão inválido: ${currentVersion}. Esperado: major.minor.patch`);
  }
  
  const [major, minor, patch] = versionParts.map(Number);
  
  if (isNaN(major) || isNaN(minor) || isNaN(patch)) {
    throw new Error(`Versão contém valores não numéricos: ${currentVersion}`);
  }
  
  switch (type) {
    case 'major':
      return `${major + 1}.0.0`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'patch':
      return `${major}.${minor}.${patch + 1}`;
    default:
      throw new Error('Tipo inválido. Use: major, minor, ou patch');
  }
}

const bumpType = Deno.args[0] as 'major' | 'minor' | 'patch';

if (!bumpType || !['major', 'minor', 'patch'].includes(bumpType)) {
  console.error("❌ Uso: deno task version:bump <type>");
  console.error("📝 Types: major | minor | patch");
  console.error("");
  console.error("💡 Exemplos:");
  console.error("   deno task version:bump patch  # 0.1.0 → 0.1.1");
  console.error("   deno task version:bump minor  # 0.1.0 → 0.2.0");
  console.error("   deno task version:bump major  # 0.1.0 → 1.0.0");
  Deno.exit(1);
}

async function createGitCommit(version: string, autoCommit: boolean = false) {
  if (!autoCommit) {
    console.log("");
    console.log("🚀 Para fazer release:");
    console.log(`   git add . && git commit -m "bump: v${version}"`);
    console.log(`   git tag v${version}`);
    console.log(`   git push origin v${version}`);
    return;
  }

  try {
    console.log("📝 Fazendo commit das mudanças...");
    
    // git add .
    const addCommand = new Deno.Command("git", {
      args: ["add", "."],
      stdout: "piped",
      stderr: "piped",
    });
    const addResult = await addCommand.output();
    
    if (addResult.code !== 0) {
      throw new Error(`git add falhou: ${new TextDecoder().decode(addResult.stderr)}`);
    }

    // git commit
    const commitCommand = new Deno.Command("git", {
      args: ["commit", "-m", `bump: v${version}`],
      stdout: "piped",
      stderr: "piped",
    });
    const commitResult = await commitCommand.output();
    
    if (commitResult.code !== 0) {
      throw new Error(`git commit falhou: ${new TextDecoder().decode(commitResult.stderr)}`);
    }

    // git tag
    const tagCommand = new Deno.Command("git", {
      args: ["tag", `v${version}`],
      stdout: "piped",
      stderr: "piped",
    });
    const tagResult = await tagCommand.output();
    
    if (tagResult.code !== 0) {
      throw new Error(`git tag falhou: ${new TextDecoder().decode(tagResult.stderr)}`);
    }

    console.log("✅ Commit e tag criados com sucesso!");
    console.log(`📦 Tag: v${version}`);
    console.log("");
    console.log("🚀 Para fazer push:");
    console.log(`   git push origin v${version}`);
    
  } catch (error: any) {
    console.error("❌ Erro no Git:", error.message);
    console.log("");
    console.log("🔧 Comandos manuais:");
    console.log(`   git add .`);
    console.log(`   git commit -m "bump: v${version}"`);
    console.log(`   git tag v${version}`);
    console.log(`   git push origin v${version}`);
  }
}

// No final, onde está updateVersion(), substituir por:
try {
  const currentVersion = await getCurrentVersion();
  console.log(`📦 Versão atual: ${currentVersion}`);
  
  const newVersion = bumpVersion(currentVersion, bumpType);
  console.log(`🚀 Nova versão: ${newVersion}`);
  console.log("");
  
  await updateVersion(newVersion);
  
  // Verificar se deve fazer commit automático
  const autoCommit = Deno.args.includes('--commit') || Deno.args.includes('-c');
  await createGitCommit(newVersion, autoCommit);
  
  console.log("✅ Processo concluído com sucesso!");
  
} catch (error: any) {
  console.error("❌ Erro:", error.message);
  Deno.exit(1);
}