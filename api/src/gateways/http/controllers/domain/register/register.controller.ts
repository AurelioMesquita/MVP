import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegisterService } from 'src/domains/domain/services/register/register.service';
import { RegisterDto } from 'src/gateways/http/dtos/register/register.dto';
import { Public } from 'src/infrastructure/decorators/public.decorator';

@Controller('/auth/register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Cadastro de usuário' })
  @ApiResponse({ status: 201 })
  async execute(@Body() body: RegisterDto) {
    const user = await this.registerService.execute(body);

    return {
      data: user,
    };
  }
}
