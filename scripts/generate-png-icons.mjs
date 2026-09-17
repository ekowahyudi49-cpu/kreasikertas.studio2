import fs from 'fs';
import zlib from 'zlib';
import path from 'path';

function crc32(buf) {
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    let byte = buf[i];
    crc = crc ^ byte;
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
    }
  }
  return (crc ^ -1) >>> 0;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeAndData = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(typeAndData), 0);
  return Buffer.concat([len, typeAndData, crc]);
}

function createEmeraldIconPNG(width, height) {
  const header = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  
  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // 8 bit
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;
  const ihdrChunk = makeChunk('IHDR', ihdrData);

  // Raw scanlines
  const bytesPerPixel = 4;
  const rawData = Buffer.alloc(height * (1 + width * bytesPerPixel));
  let offset = 0;

  const cx = width / 2;
  const cy = height / 2;
  const r = width * 0.46;

  for (let y = 0; y < height; y++) {
    rawData[offset++] = 0; // Filter: None
    for (let x = 0; x < width; x++) {
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Background: obsidian to deep emerald
      let rCol = 10;
      let gCol = 16;
      let bCol = 14;
      let aCol = 255;

      // Inside rounded rect / circle
      if (dist <= r) {
        // Subtle emerald glow
        const t = 1 - (dist / r);
        rCol = Math.round(10 + t * 5);
        gCol = Math.round(18 + t * 40);
        bCol = Math.round(14 + t * 25);

        // Center origami paper fold icon geometry
        const inDiamond = (Math.abs(dx) + Math.abs(dy)) < (width * 0.28);
        const inCenterStar = (Math.abs(dx * 2) + Math.abs(dy)) < (width * 0.18) || (Math.abs(dx) + Math.abs(dy * 2)) < (width * 0.18);
        
        if (inCenterStar) {
          rCol = 52;
          gCol = 211;
          bCol = 153; // Emerald 400
        } else if (inDiamond) {
          if (dx < 0) {
            rCol = 5;
            gCol = 150;
            bCol = 105; // Emerald 600
          } else {
            rCol = 16;
            gCol = 185;
            bCol = 129; // Emerald 500
          }
        }
      }

      rawData[offset++] = rCol;
      rawData[offset++] = gCol;
      rawData[offset++] = bCol;
      rawData[offset++] = aCol;
    }
  }

  const deflated = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', deflated);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([header, ihdrChunk, idatChunk, iendChunk]);
}

const p192 = createEmeraldIconPNG(192, 192);
const p512 = createEmeraldIconPNG(512, 512);

fs.writeFileSync('public/pwa-192x192.png', p192);
fs.writeFileSync('public/pwa-512x512.png', p512);
fs.writeFileSync('public/pwa-maskable-512x512.png', p512);
fs.writeFileSync('public/apple-touch-icon.png', p192);
fs.writeFileSync('public/favicon.ico', p192);

console.log('PWA icons created successfully!');
