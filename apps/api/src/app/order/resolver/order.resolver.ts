import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../../auth/decorators/ctx-user.decorator';
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard';
import { Action } from '../../casl/actions.eum';
import { CaslAbilityFactory } from '../../casl/casl-ability.factory';
import { Barcode } from '../../product/entities/barcode.model';
import { Product } from '../../product/entities/product.model';
import { BarcodeService } from '../../product/service/barcode.service';
import { ProductService } from '../../product/service/product.service';
import { User } from '../../user/entities/user.entity';
import { CreateOrderInput } from '../dto/create-order.input';
import { FilterOrderInput, GetOrderInput } from '../dto/filter-order.input';
import { UpdateOrderInput } from '../dto/update-order.input';
import { Order } from '../entities/order.model';
import { OrderService } from '../service/order.service';

@Resolver(() => Order)
export class OrderResolver {
  constructor(
    private readonly orderService: OrderService,
    private readonly productService: ProductService,
    private readonly barcodesService: BarcodeService,
    private readonly access: CaslAbilityFactory
    ) {}
  
  @ResolveField(() => Barcode)
  async barcode(@Parent() { productBarcode }: Order){
    return this.barcodesService.findOne({barcode: productBarcode});
  }
  @ResolveField(() => Product)
  async product(@Parent() { productBarcode }: Order){
    const { sku } = await this.barcodesService.findOne({barcode: productBarcode});
    return this.productService.findOne({ sku });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation( () => Order)
  createOrder(@Args('input') input: CreateOrderInput, @CurrentUser() user: User) {
    const ability = this.access.createForUser(user);
    if (ability.can(Action.Delete, Order)) return this.orderService.create(input)
    else throw new UnauthorizedException('Unauthorized');
  }

  @UseGuards(GqlAuthGuard)
  @Mutation( () => Order)
  updateOrder( @Args('input') input: UpdateOrderInput, @CurrentUser() user: User ) {
    const ability = this.access.createForUser(user);
    if (ability.can(Action.Update, Order)) return this.orderService.update({ id: input.id }, input);
    else throw new UnauthorizedException('Unauthorized');
  }

  @UseGuards(GqlAuthGuard)
  @Query( () => Order)
  order(@Args('input') { id }: GetOrderInput, @CurrentUser() user: User){
    const ability = this.access.createForUser(user);
    if (ability.can(Action.Update, Order)) return this.orderService.findOne({ id })
    else throw new UnauthorizedException('Unauthorized');
  }

  @UseGuards(GqlAuthGuard)
  @Query( () => [Order])
  orders(@Args('input') input: FilterOrderInput, @CurrentUser() user: User){
    const ability = this.access.createForUser(user);
    if (ability.can(Action.Update, Order)) return this.orderService.findByFilter(input);
    else throw new UnauthorizedException('Unauthorized');
  }
}
