import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthConstants } from '../constants/constants';
import { JWTPayload } from '../interfaces/jwt.interface';
import { User } from '../entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: AuthConstants.secret,
    });
  }

  async validate(payload: JWTPayload): Promise<User> {
    const { username } = payload;

    const user = await this.userRepository.findOne({ username });
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
