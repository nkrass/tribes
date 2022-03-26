import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { CreateOrderInput } from '../dto/create-order.input';
import { UpdateOrderInput } from '../dto/update-order.input';
import { OrderService } from '../service/order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() body: CreateOrderInput) {
    return this.orderService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateOrderInput) {
    return this.orderService.update({ id }, body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne({ id });
  }

  // @Get()
  // find(@Query() { userId, targetId }: { userId?: string; targetId?: string }) {
  //   if (userId && !targetId) {
  //     return this.orderService.findByUserId(userId);
  //   }
  //   throw new BadRequestException();
  // }
}
