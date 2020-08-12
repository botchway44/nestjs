import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repository/user.repository';
import { AuthCredentialsDTO } from '../dto/auth.credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from '../interfaces/jwt.interface';
import { AccessToken } from '../interfaces/accesstoken.interface';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    return await this.userRepository.signUp(authCredentialsDTO);
  }

  async signIn(authCredentialsDTO: AuthCredentialsDTO): Promise<AccessToken> {
    const username = await this.userRepository.validateUserPassword(
      authCredentialsDTO,
    );

    if (!username) throw new UnauthorizedException('Invalid credentials');

    const payload: JWTPayload = {
      username: username,
    };

    console.log(username);

    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
