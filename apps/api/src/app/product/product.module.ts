import { Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';
import { CaslModule } from '../casl/casl.module';
import { ReviewModule } from '../review/review.module';
import { BarcodeResolver } from './resolver/barcode.resolver';
import { CategoryResolver } from './resolver/category.resolver';
// import { ProductController } from './controller/product.controller';
import { ProductResolver } from './resolver/product.resolver';
import { BarcodeSchema } from './schema/barcode.schema';
import { ProductSchema } from './schema/product.schema';
import { BarcodeService } from './service/barcode.service';
import { CategoryService } from './service/category.service';
import { GoogleServices } from './service/googledoc.service';
import { ProductService } from './service/product.service';

@Module({
  imports: [
    ReviewModule, CaslModule,
    DynamooseModule.forFeature([
      {
        name: 'product',
        schema: ProductSchema,
      },
      { 
        name: 'barcode',
        schema: BarcodeSchema
      }
    ]),
  ],
  providers: [ProductService, ProductResolver, GoogleServices, BarcodeService, BarcodeResolver, CategoryResolver, CategoryService],
  // controllers: [ProductController],
  exports: [ProductService, GoogleServices, BarcodeService, CategoryService],
})
export class ProductModule {}
