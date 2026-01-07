import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SessionService {
  constructor(private readonly jwtService: JwtService) {}

  async execute(token: string) {
    const decoded = this.jwtService.decode(token) as any;

    return {
      userId: decoded.sub,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    };
  }
}
