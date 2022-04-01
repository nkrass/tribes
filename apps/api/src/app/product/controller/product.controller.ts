import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { GoogleServices } from '../../shared/googledoc.service';
import { UploadMediaService } from '../../shared/upload-media.service';
import { CreateProductInput } from '../dto/create-product.input';
import { GetProductInput, FilterProductInput } from '../dto/filter-product.input';
import { UpdateProductInput } from '../dto/update-product.input';
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
  @Get('/upload/media/:id')
  async uploadFromWb(@Param() params ) {
    const {id} = params;
    const [product] = await this.productService.findByFilter({ wildberriesId: Number(id), limit: 1, all: false});
    if (product) {
      const result = await this.uploadService.uploadFromWbToS3(id.toString(), product.sku)
      product.images = result.processed.images
      product.videos = result.processed.videos
      await this.googleService.updateProduct(product)
      return this.productService.update({ sku: product.sku }, product as any)
    }
    throw new BadRequestException();
  }
}
