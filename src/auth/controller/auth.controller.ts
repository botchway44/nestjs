import { Controller, Get, Body, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { read } from 'fs';
import { AuthCredentialsDTO } from '../dto/auth.credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(readonly authService: AuthService) {
    //   do something to the autheservice
  }
  @Post('/signup')
  signup(
    @Body(ValidationPipe) authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDTO);
  }
}
