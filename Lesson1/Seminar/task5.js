const http = require('http');

let counter = 0;

const server = http.createServer((req, res) => {
  console.log(`Запрос получен`)

  if (req.url === '/') {
    res.writeHead(200, {
      'content-type': 'text/html; charset=UTF-8',
    });
    let content = `<h1>Мой сервер работает!</h1>`;
    content += `<b>Счетчик посещения страниц:<br>
                ${++counter} страниц посещено</b>`;
    res.end(content);


  } else if (req.url === '/about') {
    res.writeHead(200, {
      'content-type': 'text/html; charset=UTF-8',
    });
    let content = '<h1>About</h1>';
    content += `<b>Счетчик посещения страниц:<br>
                ${++counter} страниц посещено</b>`;
    res.end(content);

  }else{
    res.writeHead(404, {
      'content-type': 'text/html; charset=UTF-8',
    });
    let content = '<h1>404</h1> <h2>Page Not Found...</h2>';
    content += `<b>Счетчик посещения страниц:<br>
                ${counter} страниц посещено</b>`;
    res.end(content);
  }

});

const port = 3000;

server.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});

