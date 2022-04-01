import { forwardRef, Module } from '@nestjs/common';
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
import { GoogleServices } from '../shared/googledoc.service';
import { ProductService } from './service/product.service';
import { SharedModule } from '../shared/shared.module';
import { UploadMediaService } from '../shared/upload-media.service';
import { ProductController } from './controller/product.controller';

@Module({
  imports: [
    forwardRef(() => ReviewModule),
    CaslModule, SharedModule,
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
  providers: [ProductService, ProductResolver, GoogleServices, BarcodeService, BarcodeResolver, CategoryResolver, CategoryService, UploadMediaService],
  controllers: [ProductController],
  exports: [ProductService, BarcodeService, CategoryService],
})
export class ProductModule {}
