import {
    CanActivate,
    ExecutionContext,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
    auth,
    InvalidTokenError,
    UnauthorizedError,
} from 'express-oauth2-jwt-bearer';
import { promisify } from 'util';
import { Logger } from "@nestjs/common";

@Injectable()
export class AuthorizationGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const response = context.switchToHttp().getResponse<Response>();

        const validateAccessToken = promisify(auth({
            issuerBaseURL: process.env.ISSUER_BASE_URL,
            audience: process.env.AUDIENCE,
            tokenSigningAlg: 'RS256'
        }));

        try {
            await validateAccessToken(request, response);
            request.user = {
                id: (request as any).auth?.payload?.sub
            };

            return true;
        } catch (error) {
            if (error instanceof InvalidTokenError) {
                throw new UnauthorizedException('Bad credentials');
            }

            if (error instanceof UnauthorizedError) {
                throw new UnauthorizedException('Requires authentication');
            }

            throw new InternalServerErrorException();
        }
    }
}
