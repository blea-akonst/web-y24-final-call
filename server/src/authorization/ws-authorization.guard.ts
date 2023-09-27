import {CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import * as jwt from 'jsonwebtoken';
import * as jwksClient from 'jwks-rsa';
import {WsException} from "@nestjs/websockets";

@Injectable()
export class WsAuthorizationGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const clientSocket = context.switchToWs().getClient();
        const token = clientSocket.handshake.query.token || clientSocket.handshake.headers.authorization;

        const jwksUri = process.env.JWKS_URI;

        const client = jwksClient({
            jwksUri,
            cache: true,
            cacheMaxAge: 600000
        });

        const getKey = (header, callback) => {
            client.getSigningKey(header.kid, (err, key) => {
                const signingKey = key?.getPublicKey();
                callback(null, signingKey);
            });
        };

        try {
            clientSocket.handshake.query.decoded = jwt.verify(token, getKey, {algorithms: ['RS256']});
            return true;
        } catch (err) {
            throw new WsException('Invalid token');
        }
    }
}
