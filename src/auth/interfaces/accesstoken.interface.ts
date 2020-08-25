import { registerEnumType, InterfaceType, Field } from "@nestjs/graphql";
@InterfaceType()
export abstract class AccessToken {
  @Field(type => String)
  accessToken: string;
}

