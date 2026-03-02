import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();
@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['x-api-key'];

    const validApiKey = process.env.ORDER_API_KEY || 'api-secret';
    if (apiKey !== validApiKey) {
      throw new UnauthorizedException('Access rejected: Invalid Api Key');
    }

    return true;
  }
}
