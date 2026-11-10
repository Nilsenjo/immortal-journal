import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve,extname} from 'node:path';
const root=resolve('dist');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'};
createServer(async(req,res)=>{try{const path=resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(path!==root&&!path.startsWith(root+'/')){res.writeHead(403).end();return}const file=path===root?root+'/index.html':path;const data=await readFile(file);res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream'}).end(data)}catch{res.writeHead(404).end('Not found')}}).listen(Number(process.env.PORT)||3000,'127.0.0.1',()=>console.log('Local preview: http://127.0.0.1:3000'));
