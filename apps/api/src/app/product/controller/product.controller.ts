import {
  BadRequestException,
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { GoogleServices } from '../../shared/googledoc.service';
import { UploadMediaService } from '../../shared/upload-media.service';
import { ProductService } from '../service/product.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly uploadService: UploadMediaService,
    private readonly googleService: GoogleServices
  ) {}

  // @Post()
  // create(@Body() body: CreateProductInput) {
  //   return this.productService.create(body);
  // }

  // @Patch(':sku')
  // update(@Body() body: UpdateProductInput) {
  //   const { sku } = body;
  //   return this.productService.update({ sku }, body);
  // }

  // @Get(':sku')
  // findOne(@Body() body: GetProductInput) {
  //   const { sku } = body;
  //   return this.productService.findOne({ sku });
  // }

  // @Get()
  // find(@Query() input: FilterProductInput) {
  //   if (input) {
  //     return this.productService.findByFilter(input);
  //   }
  //   throw new BadRequestException();
  // }
  @Get('/upload/media/:sku')
  async uploadFromWb(@Param() params ) {
    const { sku } = params;
    const product = await this.productService.findOne(sku);
    if (product) {
      const wbId = product.externalId.find(e => e.name === 'wildberries')?.id;
      if (wbId){
        const result = await this.uploadService.uploadFromWbToS3(wbId, product.sku)
        product.images = result.processed.images
        product.videos = result.processed.videos
        await this.googleService.updateProduct(product)
        return this.productService.update(sku, product)
      } else throw new BadRequestException('Product not found')
    }
    throw new BadRequestException();
  }
}
