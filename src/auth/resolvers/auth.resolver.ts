import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GqlAuthGuard } from '../strategies/gql.auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '../decorators/get-user-decorator';
import { User } from '../entities/user.entity';
import { AuthService } from '../service/auth.service';
import { AccessToken } from '../interfaces/accesstoken.interface';
import { AuthCredentialsDTO } from '../dto/auth.credentials.dto';

@Resolver((of) => User)
export class AuthResolver {
  constructor(readonly authService: AuthService) {
    //   do something to the autheservice
  }
  @Query((returns) => User)
  @UseGuards(GqlAuthGuard)
  whoAmI(@CurrentUser() user: User): User {
    console.log(`This is the user ${user}`);
    return user;
  }

  @Mutation((returns) => User, {
    name: 'signin',
    description: 'Returns token after login',
  })
  signin(
    @CurrentUser() user: User,
    @Args('authCredentialsDTO', { type: () => AuthCredentialsDTO }) authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<AccessToken> {
    return this.authService.signIn(authCredentialsDTO);
  }


  @Mutation((returns) => User, {
    name: 'Signup',
    description: 'Creates a User Account',
  })
  signup(
    @CurrentUser() user: User,
    @Args('authCredentialsDTO', { type: () => AuthCredentialsDTO }) authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDTO);
  }
}
