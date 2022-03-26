import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateReviewInput } from '../dto/create-review.input';
import { FilterReviewInput } from '../dto/filter-review.input';
import { UpdateReviewInput } from '../dto/update-review.input';
import { ReviewKey } from '../entities/review.model';
import { ReviewService } from '../service/review.service';


@Controller('review')
export class ReviewController {
  constructor(private readonly productService: ReviewService) {}

  @Post()
  create(@Body() body: CreateReviewInput) {
    return this.productService.create(body);
  }

  @Patch(':id')
  update(@Body() body: UpdateReviewInput) {
    const { id } = body;
    return this.productService.update({ id }, body);
  }

  @Get(':id')
  findOne(@Body() body: ReviewKey) {
    const { id } = body;
    return this.productService.findOne({ id });
  }

  @Get()
  find(@Query() input: FilterReviewInput) {
    if (input) {
      return this.productService.findByFilter(input);
    }
    throw new BadRequestException();
  }
}
