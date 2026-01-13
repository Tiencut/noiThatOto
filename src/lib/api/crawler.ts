// Thin wrapper that reads crawled data from public/data/crawled
import fs from 'fs';
import path from 'path';

export function readCrawled(platform: string) {
  const file = path.join(process.cwd(), 'public', 'data', 'crawled', `${platform}.json`);
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
}
