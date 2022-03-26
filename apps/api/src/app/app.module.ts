import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DynamooseModule } from 'nestjs-dynamoose';
import { ItemModule } from './item/item.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CaslModule } from './casl/casl.module';
import { ComplexityPlugin } from './shared/complexity.plugin';
import { OrderModule } from './order/order.module';
import { CartModule } from './cart/cart.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DateScalar } from './shared/date.scalar';
import { environment } from '../environments/environment';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => environment],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      buildSchemaOptions: {
        
      },
      driver: ApolloDriver,
      playground: {
        endpoint:
          process.env.IS_NOT_SLS === 'true'
            ? '/graphql'
            : `/${process.env.STAGE}/graphql`,
      },
    }),
    DynamooseModule.forRoot({
      local: process.env.IS_DDB_LOCAL === 'true',
      aws: { region: process.env.REGION },
      model: {
        create: false,
        prefix: `${process.env.SERVICE}-${process.env.STAGE}-`,
        suffix: '-table',
      },
    }),
    CaslModule, AuthModule, UserModule, ProductModule, ReviewModule, ItemModule, OrderModule, CartModule 
  ], providers: [ComplexityPlugin, DateScalar],
})
export class AppModule {}
