#!/usr/bin/env -S deno run --allow-read --allow-write

async function updateVersion(newVersion: string) {
  try {
    // 1. Atualizar deno.json
    const denoConfig = JSON.parse(await Deno.readTextFile("deno.json"));
    denoConfig.version = newVersion;
    await Deno.writeTextFile("deno.json", JSON.stringify(denoConfig, null, 2));

    // 2. Atualizar package.json
    const packageJson = JSON.parse(await Deno.readTextFile("package.json"));
    packageJson.version = newVersion;
    await Deno.writeTextFile("package.json", JSON.stringify(packageJson, null, 2));

    // 3. Atualizar src-tauri/Cargo.toml
    const cargoToml = await Deno.readTextFile("src-tauri/Cargo.toml");
    const updatedCargoToml = cargoToml.replace(
      /version = "[^"]*"/,
      `version = "${newVersion}"`
    );
    await Deno.writeTextFile("src-tauri/Cargo.toml", updatedCargoToml);

    // 4. Atualizar src-tauri/tauri.conf.json
    const tauriConfig = JSON.parse(await Deno.readTextFile("src-tauri/tauri.conf.json"));
    tauriConfig.package.version = newVersion;
    await Deno.writeTextFile("src-tauri/tauri.conf.json", JSON.stringify(tauriConfig, null, 2));

    console.log(`✅ Versão atualizada para ${newVersion}`);
    console.log("📝 Arquivos atualizados:");
    console.log("   - deno.json");
    console.log("   - package.json");
    console.log("   - src-tauri/Cargo.toml");
    console.log("   - src-tauri/tauri.conf.json");
    console.log("");
    console.log("🚀 Para fazer release:");
    console.log(`   git add . && git commit -m "bump: v${newVersion}"`);
    console.log(`   git tag v${newVersion}`);
    console.log(`   git push origin v${newVersion}`);
    
  } catch (error: any) {
    console.error("❌ Erro ao atualizar versão:", error.message);
    Deno.exit(1);
  }
}

const newVersion = Deno.args[0];

if (!newVersion) {
  console.error("❌ Uso: deno task version <versão>");
  console.error("📝 Exemplo: deno task version 0.2.0");
  console.error("");
  console.error("💡 Formatos aceitos:");
  console.error("   - 0.2.0 (release)");
  console.error("   - 0.2.0-beta.1 (pre-release)");
  console.error("   - 1.0.0-rc.1 (release candidate)");
  Deno.exit(1);
}

// Validar formato semver básico
const semverRegex = /^\d+\.\d+\.\d+(-[a-zA-Z0-9\-\.]+)?$/;
if (!semverRegex.test(newVersion)) {
  console.error("❌ Formato de versão inválido!");
  console.error("📝 Use o formato semver: major.minor.patch");
  console.error("💡 Exemplo: 1.2.3 ou 1.2.3-beta.1");
  Deno.exit(1);
}

await updateVersion(newVersion);