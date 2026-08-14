const fs = require('fs');
const path = require('path');

function resolveEnvironmentFile() {
  const args = process.argv.slice(2);
  const configArg = args.find((arg) => arg.startsWith('--configuration='));
  const configName = configArg ? configArg.split('=')[1] : null;

  const candidates = [];
  if (configName) {
    candidates.push(path.resolve(__dirname, `src/environments/environment.${configName}.ts`));
  }
  candidates.push(path.resolve(__dirname, 'src/environments/environment.development.ts'));
  candidates.push(path.resolve(__dirname, 'src/environments/environment.ts'));

  return candidates.find((candidate) => fs.existsSync(candidate)) || candidates[candidates.length - 1];
}

function readTargetFromEnvironment() {
  const envPath = resolveEnvironmentFile();
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/creacionFormulariosApiServerUrl:\s*['"]([^'"]+)['"]/);
  console.log(`Using target from environment file (${envPath}): ${match ? match[1] : 'http://localhost:8080'}`);
  return match ? match[1] : 'http://localhost:8080';
}

const target = readTargetFromEnvironment();

module.exports = {
  '/apiForms': {
    target,
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      '^/apiForms': ''
    },
    logLevel: 'debug'
  }
};
