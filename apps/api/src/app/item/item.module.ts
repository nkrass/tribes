import { Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';
import { CaslModule } from '../casl/casl.module';
import { ProductModule } from '../product/product.module';
// import { ItemController } from './controller/review.controller';
import { ItemResolver } from './resolver/item.resolver';
import { ItemSchema } from './schema/item.schema';
import { ItemService } from './service/item.service';

@Module({
  imports: [
    ProductModule, CaslModule,
    DynamooseModule.forFeature([
      {
        name: 'item',
        schema: ItemSchema,
      },
    ])
  ],
  providers: [ItemResolver, ItemService],
  // controllers: [ItemController],
  exports: [ItemService]
})
export class ItemModule {}
