import { Resolver, Query } from '@nestjs/graphql';
import { GqlAuthGuard } from './strategies/gql.auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from './decorators/get-user-decorator';
import { User } from './entities/user.entity';

@Resolver((of) => User)
export class AuthResolver {
  @Query((returns) => User)
  @UseGuards(GqlAuthGuard)
  whoAmI(@CurrentUser() user: User): User {
    console.log(`This is the user ${user}`);
    return user;
  }
}
