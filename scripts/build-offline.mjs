import fs from 'node:fs';
import {offlineShell} from './offline-shell.mjs';
const assets=fs.readdirSync('dist/assets').filter(n=>/\.(js|css)$/.test(n)).map(n=>'/assets/'+n);
assets.push('/manifest.webmanifest','/ps-local-v1.svg','/ps-local-v1-180.png','/ps-local-v1-192.png','/ps-local-v1-512.png');
fs.writeFileSync('dist/sw.js',offlineShell(assets));
console.log('Offline app shell prepared; API responses and media are not put in shared caches.');
