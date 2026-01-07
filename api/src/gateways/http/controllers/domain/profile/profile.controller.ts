import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/framework/authentication/jwt-auth.guard';

@Controller('/profile')
export class ProfileController {
  @UseGuards(JwtAuthGuard)
  @Get()
  me(@Req() req: any) {
    return {
      user: req.user,
    };
  }
}
