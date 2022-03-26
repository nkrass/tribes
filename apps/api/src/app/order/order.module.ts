import { Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';
import { CaslModule } from '../casl/casl.module';
import { ProductModule } from '../product/product.module';
import { OrderResolver } from './resolver/order.resolver';
import { OrderSchema } from './schema/order.schema';
import { OrderService } from './service/order.service';


@Module({
  imports: [
    CaslModule, ProductModule,
    DynamooseModule.forFeature([
      {
        name: 'order',
        schema: OrderSchema,
      },
    ]),
  ],
  providers: [OrderService, OrderResolver],
})
export class OrderModule {}
