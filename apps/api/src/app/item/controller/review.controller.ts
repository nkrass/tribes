import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateItemInput } from '../dto/create-item.input';
import { FilterItemInput } from '../dto/filter-item.input';
import { UpdateItemInput } from '../dto/update-item.input';
import { ItemKey } from '../entities/item.model';
import { ItemService } from '../service/item.service';


@Controller('review')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  create(@Body() body: CreateItemInput) {
    return this.itemService.create(body);
  }

  @Patch(':id')
  update(@Body() body: UpdateItemInput) {
    const { id } = body;
    return this.itemService.update({ id }, body);
  }

  @Get(':id')
  findOne(@Body() body: ItemKey) {
    const { id } = body;
    return this.itemService.findOne({ id });
  }

  @Get()
  find(@Query() input: FilterItemInput) {
    if (input) {
      return this.itemService.findByFilter(input);
    }
    throw new BadRequestException();
  }
}
