import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthConstants } from './constants/constants';
import { JwtStrategy } from './strategies/passport.strategy';
import { GqlAuthGuard } from './strategies/gql.auth.guard';
import { AuthResolver } from './resolvers/auth.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({ session: true, defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: AuthConstants.secret,
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GqlAuthGuard, AuthResolver],
  exports: [JwtStrategy, PassportModule, GqlAuthGuard],
})
export class AuthModule {}
