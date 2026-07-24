const { execSync } = require('child_process');
try {
  execSync('npm run build', { stdio: 'inherit', env: { ...process.env, NITRO_PRESET: 'vercel' } });
  console.log('Build succeeded');
} catch (e) {
  console.error('Build failed');
}
