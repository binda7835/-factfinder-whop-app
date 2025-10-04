#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Whop Next.js App Setup Helper\n');

// Check if .env.local exists
const envPath = path.join(__dirname, '.env.local');
const envTemplatePath = path.join(__dirname, 'env-template.txt');

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envTemplatePath)) {
    console.log('📝 Creating .env.local from template...');
    fs.copyFileSync(envTemplatePath, envPath);
    console.log('✅ .env.local created successfully!');
    console.log('📋 Please update .env.local with your actual Whop credentials');
  } else {
    console.log('❌ Environment template not found');
  }
} else {
  console.log('✅ .env.local already exists');
}

// Check package.json
const packagePath = path.join(__dirname, 'package.json');
if (fs.existsSync(packagePath)) {
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  console.log(`📦 Project: ${packageJson.name}`);
  console.log(`📦 Version: ${packageJson.version}`);
}

// Check if node_modules exists
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
  console.log('✅ Dependencies are installed');
} else {
  console.log('⚠️  Dependencies not installed yet');
  console.log('💡 Run: npm install');
}

console.log('\n🎯 Next Steps:');
console.log('1. Update .env.local with your Whop credentials');
console.log('2. Run: npm install (if not done already)');
console.log('3. Run: npm run dev');
console.log('4. Visit: http://localhost:3000');
console.log('\n📚 See SETUP_GUIDE.md for detailed instructions');
