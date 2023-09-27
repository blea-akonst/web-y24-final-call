import {
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import {OrderGatewayDto} from "../dtos/order.gateway.dto";
import {Logger, UseGuards} from "@nestjs/common";
import {WsAuthorizationGuard} from "../authorization/ws-authorization.guard";

@UseGuards(WsAuthorizationGuard)
@WebSocketGateway({ namespace: '/order-ws' })
export class OrdersGateway implements OnGatewayInit {
    @WebSocketServer() server: Server;

    afterInit(server: Server) {
        Logger.log('Orders Gateway initialized', 'Orders Gateway')
    }

    orderCreated(order: OrderGatewayDto) {
        this.server.emit('orderCreated', order);
    }

    handleConnection(client: Socket, ...args: any[]) {
        Logger.log(`Client connected: ${client.id}`, 'Orders Gateway');
    }

    handleDisconnect(client: Socket) {
        Logger.log(`Client disconnected: ${client.id}`, 'Orders Gateway');
    }
}
