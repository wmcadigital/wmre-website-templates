const url = require('url');
const util = require('util');
const zip = util.promisify(require('zlib').gzip);
const readFile = util.promisify(require('fs').readFile);
const l = console.log;

const server = require('http').createServer(async (req, res)=>{

	if(!req.headers.host || typeof(req.headers.host) != 'string'){
		res.writeHead(404);
		res.end()
	}
  
  if(req.method == 'GET'){
    let file = url.parse(req.url).pathname.substr(1).split('/').pop();
    file = file?(file.includes('.')?file:file+'.html'):'index.html';
    
    let t = '';

    switch(file.split('.')[1]){
      case 'html': t = 'text/html; charset=utf-8';break;
      case 'json': t = 'application/json';break;
      case 'map':
      case 'js': t = 'application/javascript';break;
      case 'ttf': t = 'font/ttf';break;
      case 'ico': t = 'image/x-icon';break;
      case 'png': t = 'image/png';break;
      case 'jpg': t = 'image/jpeg';break;
      case 'svg': t = 'image/svg+xml';break;
      case 'css': t = 'text/css';
    }

    try{
      //l(__dirname+'/assets/'+file);
      let buff = await readFile(__dirname+'/assets/'+file);

      //output(buff);
      
      //if(ext == 'html'){
        //data = await zip(data);
        //header['Content-Encoding'] = 'gzip';
     //}

      res.writeHead(200,{'Content-Type':t,'Cache-Control':'public, max-age=600','Access-Control-Allow-Origin':'*'});
      res.end(buff);

      
    }catch(e){      
      res.writeHead(404,{'Content-Type':'text/plain','Access-Control-Allow-Origin':'*'});
      res.end('');
    }
  }

});

server.listen(8000);
