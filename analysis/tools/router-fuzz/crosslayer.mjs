import http from 'http';
import {chromium} from 'playwright';

// Server mencatat PERSIS apa yang diterimanya dari peramban.
const diterima=[];
const srv=http.createServer((req,res)=>{
  diterima.push(req.url);
  res.writeHead(200,{'Content-Type':'text/html'});
  res.end('<!doctype html><title>t</title>ok');
});
await new Promise(r=>srv.listen(0,r));
const port=srv.address().port;

const browser=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',args:['--no-sandbox']});
const page=await browser.newPage();

const uji=['/admin','/admin)','/admin)x','/admin(','/admin)/y'];
const hasil=[];
for(const u of uji){
  diterima.length=0;
  await page.goto(`http://localhost:${port}${u}`,{waitUntil:'load'});
  const pathBrowser=await page.evaluate(()=>location.pathname);
  hasil.push({diminta:u, diterimaServer:diterima[0], locationPathname:pathBrowser});
}
await browser.close(); srv.close();

// Pencocok sisi-server yang lazim dipakai untuk otorisasi berbasis path.
const pencocok = {
  'req.path === "/admin"'          : p => p === '/admin',
  'p.startsWith("/admin/")'        : p => p.startsWith('/admin/'),
  'p === "/admin" || p.startsWith("/admin/")': p => p==='/admin'||p.startsWith('/admin/'),
  'nginx: location = /admin'       : p => p === '/admin',
  'nginx: location /admin (prefix)': p => p.startsWith('/admin'),
  'regex ^/admin$'                 : p => /^\/admin$/.test(p),
};

console.log('APA YANG DITERIMA SERVER DARI PERAMBAN');
console.log('='.repeat(78));
for(const h of hasil){
  console.log(`diminta ${JSON.stringify(h.diminta).padEnd(14)} -> server menerima ${JSON.stringify(h.diterimaServer)}`);
}
console.log();
console.log('APAKAH PENCOCOK SISI-SERVER MENGANGGAPNYA "/admin"?');
console.log('='.repeat(78));
const paths=hasil.map(h=>h.diterimaServer);
const lebar=Math.max(...Object.keys(pencocok).map(k=>k.length));
console.log('pencocok'.padEnd(lebar)+' | '+paths.map(p=>p.padEnd(11)).join('| '));
console.log('-'.repeat(lebar+paths.length*13));
for(const [nama,fn] of Object.entries(pencocok)){
  console.log(nama.padEnd(lebar)+' | '+paths.map(p=>(fn(p)?'COCOK':'-').padEnd(11)).join('| '));
}
console.log();
console.log('Angular router mencocokkan SEMUA path di atas ke rute `admin` (terukur sebelumnya).');
