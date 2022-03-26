import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DynamooseModule } from 'nestjs-dynamoose';
import { ReviewSchema } from '../schema/review.schema';

export const ReviewTestImports = [
  ConfigModule.forRoot(),
  GraphQLModule.forRoot({
    autoSchemaFile: true,
  }),
  DynamooseModule.forRoot({
    local: 'http://localhost:8001',
    aws: { region: 'local' },
    model: {
      create: false,
      prefix: `${process.env.SERVICE}-${process.env.STAGE}-`,
      suffix: '-table',
    },
  }),
  DynamooseModule.forFeature([
    {
      name: 'review',
      schema: ReviewSchema,
    },
  ]),
];
