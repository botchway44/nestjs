import {
  Controller,
  Get,
  Request,
  Body,
  Post,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { AuthCredentialsDTO } from '../dto/auth.credentials.dto';
import { JWTPayload } from '../interfaces/jwt.interface';
import { AccessToken } from '../interfaces/accesstoken.interface';
import { AuthGuard } from '@nestjs/passport';

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

  @Get('/signin')
  signin(@Body() authCredentialsDTO: AuthCredentialsDTO): Promise<AccessToken> {
    return this.authService.signIn(authCredentialsDTO);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() res: Request): Promise<void> {
    console.log(res);

    return null;
  }
}
