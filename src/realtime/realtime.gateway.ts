import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:4200'], // à adapter
    credentials: true,
  },
})
export class RealtimeGateway {
  @WebSocketServer()
  server!: Server;

  broadcastNewData(data: unknown): void {
    // Nom d'event pour le front
    this.server.emit('data:update', data);
  }
}
