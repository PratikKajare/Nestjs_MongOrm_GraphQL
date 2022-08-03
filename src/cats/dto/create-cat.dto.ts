import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { GraphQLID } from 'graphql';
// import { ID } from 'type-graphql';

@ObjectType()
@Schema()
export class CatType {
  @Prop()
  @Field((type) => ID, { nullable: true })
  id?: string;

  @Prop()
  @Field()
  name: string;
  @Prop()
  @Field({ nullable: true })
  icon?: string;
  @Prop()
  @Field({ nullable: true })
  description: string;
  @Prop()
  @Field({ nullable: true })
  status: string;
  @Prop()
  @Field({ nullable: true })
  updatedAt: string;
  @Prop()
  @Field({ nullable: true })
  createdAt: string;
}
