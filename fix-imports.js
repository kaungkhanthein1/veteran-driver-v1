import fs from 'fs';
import path from 'path';

// Folders to scan
const folders = [
  'src/components',
  'src/Pages'
];

// Patterns to replace
const replacements = [
  { regex: /(['"`])(\.{1,2}\/)+assets\//g, replacement: '$1assets/' },
  { regex: /(['"`])(\.{1,2}\/)+icons\//g, replacement: '$1icons/' }
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  replacements.forEach(({ regex, replacement }) => {
    content = content.replace(regex, replacement);
  });
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function walk(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      processFile(fullPath);
    }
  });
}

folders.forEach(walk);

console.log('All relative asset/icon imports have been updated to absolute imports!');
