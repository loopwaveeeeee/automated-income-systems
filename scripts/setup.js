
const fs = require('fs');
const path = require('path');

// safe ROOT_DIR fallback so this script works in CommonJS/ESM or odd runtimes
const ROOT_DIR = (typeof __dirname !== 'undefined') ? __dirname : (typeof process !== 'undefined' && process.cwd ? process.cwd() : '.');

console.log('🚀 Setting up Automated Income Systems...\n');

// Create necessary directories
const directories = [
    'logs',
    'data',
    'backups',

    'temp'
];

directories.forEach(dir => {
    const dirPath = path.join(ROOT_DIR, '..', dir);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`✅ Created directory: ${dir}`);
    }
});

// Check if .env file exists
const envPath = path.join(ROOT_DIR, '..', '.env');
const envExamplePath = path.join(ROOT_DIR, '..', '.env.example');

if (!fs.existsSync(envPath)) {
    if (fs.existsSync(envExamplePath)) {
        fs.copyFileSync(envExamplePath, envPath);
        console.log('✅ Created .env file from .env.example');
        console.log('⚠️  Please edit .env file with your API keys before starting');
    } else {
        console.log('❌ .env.example file not found');
    }
} else {
    console.log('✅ .env file already exists');
}

// Create initial data files
const initialData = {
    campaigns: [],
    products: [],
    dropshipping_products: [],
    dividend_stocks: [],
    performance: []
};

Object.entries(initialData).forEach(([filename, data]) => {
    const filePath = path.join(ROOT_DIR, '..', 'data', `${filename}.json`);
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log(`✅ Created initial data file: ${filename}.json`);
    }
});

console.log('\n🎉 Setup complete!');
console.log('\nNext steps:');
console.log('1. Edit .env file with your API keys');
console.log('2. Run: npm start');
console.log('3. Open: http://localhost:3000/dashboard');
console.log('\n⚠️  Important: Start with paper trading and small amounts!');
console.log('📖 Read the README.md for detailed configuration instructions');