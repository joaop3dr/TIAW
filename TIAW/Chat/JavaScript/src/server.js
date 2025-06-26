const { WebSocketServer } = require("ws");
const http = require("http");
const fs = require("fs");
const url = require("url");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 8080;
// Criar um servidor HTTP
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    if (req.method === 'GET' && parsedUrl.pathname === '/users') {
        // Lê o arquivo de usuários
        fs.readFile('users.json', 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Erro ao ler o arquivo de usuários.');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        });
        } else if (req.method === 'POST' && parsedUrl.pathname === '/register') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const newUser  = JSON.parse(body);
            fs.readFile('users.json', 'utf8', (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Erro ao ler o arquivo de usuários.');
                    return;
                }
                const users = JSON.parse(data);
                users.push(newUser );
                fs.writeFile('users.json', JSON.stringify(users, null, 2), (err) => {
                    if (err) {
                        res.writeHead(500);
                        res.end('Erro ao salvar o usuário.');
                        return;
                        }
                    res.writeHead(200);
                    res.end('Usuário cadastrado com sucesso!');
                });
            });
        });
    } else {
        res.writeHead(404);
        res.end('Rota não encontrada.');
    }
});
// Criar o servidor WebSocket
const wss = new WebSocketServer({ server });
wss.on("connection", (ws) => {
    ws.on("error", console.error);
    ws.on("message", (data) => {
        wss.clients.forEach((client) => {
            if (client.readyState === client.OPEN) {
                client.send(data.toString());
            }
        });
    });
    console.log("Client Connected");
});
// Inicia o servidor HTTP e WebSocket
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});