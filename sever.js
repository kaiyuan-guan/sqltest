const http = require('http');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'Taobao'
});

connection.connect();

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/insert') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const input = JSON.parse(body).input;
            connection.query(`INSERT INTO mytable (name) VALUES ('${input}')`, (error, results, fields) => {
                if (error) throw error;
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('数据插入成功');
            });
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});

