import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DynamooseModule } from 'nestjs-dynamoose';
import { ProductSchema } from '../schema/product.schema';

export const ProductTestImports = [
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
      name: 'product',
      schema: ProductSchema,
    },
  ]),
];
