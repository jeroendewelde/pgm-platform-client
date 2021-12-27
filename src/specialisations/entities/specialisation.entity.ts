import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Specialisation {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
