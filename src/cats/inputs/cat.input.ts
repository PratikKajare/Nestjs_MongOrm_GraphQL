import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLID, isNullableType } from 'graphql';

@InputType()
export class CatInput {
  @Field((type) => ID, { nullable: true })
  id?: string;

  @Field()
  name: string;
  @Field({ nullable: true })
  icon?: string;
  @Field({ nullable: true })
  description: string;
  @Field({ nullable: true })
  status: string;
  @Field({ nullable: true })
  updatedAt: string;
  @Field({ nullable: true })
  createdAt: string;
}

@InputType()
export class ListPersonInput {
  @Field()
  status?: string;
}
