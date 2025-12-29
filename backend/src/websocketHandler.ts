const WebSocket = require('ws');
import type { WebSocket as Socket, WebSocketServer } from 'ws';
import type { Server as HttpServer, IncomingMessage } from 'http'
const { generateTextStreamWs } = require('./services/llmService');

function initWebsockets(server: HttpServer): WebSocketServer {
    const wss = new WebSocket.Server({ server, path: '/ws' });

    wss.on('connection', (ws: Socket, req: IncomingMessage) => {
        const remote = req && req.socket ? `${req.socket.remoteAddress}:${req.socket.remotePort}` : 'unknown';
        console.log('Client connected:', remote);

        ws.on('message', async prompt => {
            console.log('Received:', prompt.toString());
            generateTextStreamWs(prompt.toString(), ws);
        });

        ws.on('close', () => {
            console.log('Client disconnected:', remote);
        });

        ws.on('error', err => {
            console.error('WebSocket error:', err);
        });
    });

    console.log('WebSocket server initialized');
    return wss;
}

module.exports = initWebsockets;