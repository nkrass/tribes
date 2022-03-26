import { Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';
import { CartSchema } from './schema/cart.schema';
import { ProductModule } from '../product/product.module';
import { CartResolver } from './resolver/cart.resolver';
import { CartService } from './service/cart.service';
import { CaslModule } from '../casl/casl.module';

@Module({
  imports: [
    ProductModule, CaslModule,
    DynamooseModule.forFeature([
      {
        name: 'cart',
        schema: CartSchema,
      },
    ])
  ],
  providers: [CartResolver, CartService],
  exports: [CartService],
})
export class CartModule {}
