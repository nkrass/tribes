import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateProductInput } from '../dto/create-product.input';
import { GetProductInput, FilterProductInput } from '../dto/filter-product.input';
import { UpdateProductInput } from '../dto/update-product.input';
import { ProductService } from '../service/product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() body: CreateProductInput) {
    return this.productService.create(body);
  }

  @Patch(':sku')
  update(@Body() body: UpdateProductInput) {
    const { sku } = body;
    return this.productService.update({ sku }, body);
  }

  @Get(':sku')
  findOne(@Body() body: GetProductInput) {
    const { sku } = body;
    return this.productService.findOne({ sku });
  }

  @Get()
  find(@Query() input: FilterProductInput) {
    if (input) {
      return this.productService.findByFilter(input);
    }
    throw new BadRequestException();
  }
}
