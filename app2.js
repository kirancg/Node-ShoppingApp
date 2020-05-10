const http = require('http');

const server = http.createServer((req, res) => {
    console.log("Hello server");
    const url = req.url;
    const method = req.method;
    if (url == '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My User</title></head>')
        res.write('<body><form method = "POST" action = "/create-user"><input type = "text" name = "name"><button type="submit">Send</button></form></body>')
        res.write('</html>');
        return res.end();
    }
    if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            console.log(message);
            res.setHeader('Location', '/users');
            res.end();
        });
    }

    if (url == '/users') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Dummy Users List</title></head>')
        res.write('<body><ul><li>User1</li><li>User2</li></ul></body>')
        res.write('</html>');
        return res.end();
    }
   
})

server.listen(3000);