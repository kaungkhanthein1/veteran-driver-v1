import fs from 'fs';
import path from 'path';

const SRC_DIR = './src';
const EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx'];
const JSX_TEXT_REGEX = />[^<{][^<>{}]+</g; // Matches text between tags, not inside {}

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    const matches = line.match(JSX_TEXT_REGEX);
    if (matches) {
      matches.forEach(match => {
        // Clean up the match
        const text = match.slice(1, -1).trim();
        if (text && !text.startsWith('{') && !text.endsWith('}')) {
          console.log(`${filePath}:${idx + 1}: "${text}"`);
        }
      });
    }
  });
}

function walk(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (EXTENSIONS.includes(path.extname(fullPath))) {
      scanFile(fullPath);
    }
  });
}

walk(SRC_DIR);
