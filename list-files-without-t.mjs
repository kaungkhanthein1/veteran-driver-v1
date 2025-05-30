import fs from 'fs';
import path from 'path';

const SRC_DIR = './src';
const EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx'];

function hasTFunction(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  // Looks for t(' or t(" or t(`
  return /t\s*\(\s*['"`]/.test(content);
}

function walk(dir, result = []) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath, result);
    } else if (EXTENSIONS.includes(path.extname(fullPath))) {
      if (!hasTFunction(fullPath)) {
        result.push(fullPath);
      }
    }
  });
  return result;
}

const filesWithoutT = walk(SRC_DIR);

console.log('Files without t(...):');
filesWithoutT.forEach(f => console.log(f));
console.log(`\nTotal: ${filesWithoutT.length} file(s)`);
