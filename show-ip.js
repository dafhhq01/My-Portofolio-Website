import os from 'os';

const interfaces = os.networkInterfaces();
let localIP = '';

for (const name of Object.keys(interfaces)) {
  for (const net of interfaces[name]) {
    const isIPv4 = net.family === 'IPv4';
    const isNotInternal = !net.internal;
    const isLikelyRealNetwork = net.address.startsWith('192.168.');

    if (isIPv4 && isNotInternal && isLikelyRealNetwork) {
      localIP = net.address;
    }
  }
}

if (localIP) {
  console.log(`🌐 Buka di HP kamu: http://${localIP}:5173`);
} else {
  console.log("⚠️ Tidak bisa mendeteksi IP lokal. Gunakan http://localhost:5173");
}
