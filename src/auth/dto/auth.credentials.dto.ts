import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AuthCredentialsDTO {
  @ApiProperty({
    name: 'username',
    description: 'The username for login or signup',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Field((type) => String)
  username: string;

  @ApiProperty({
    name: 'password',
    description: 'The password for login  or signup',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  // @Matches(/((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'Enter a strong Password',
  // })
  @Field((type) => String)
  password: string;
}
