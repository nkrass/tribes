import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DynamooseModule } from 'nestjs-dynamoose';
import { ItemSchema } from '../schema/item.schema';

export const ItemTestImports = [
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
      schema: ItemSchema,
    },
  ]),
];
