import { UseGuards, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { Args, ComplexityEstimatorArgs, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../../auth/decorators/ctx-user.decorator';
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard';
import { Action } from '../../casl/actions.eum';
import { CaslAbilityFactory } from '../../casl/casl-ability.factory';
import { BarcodeService } from '../../product/service/barcode.service';
import { User } from '../../user/entities/user.entity';
import { CartItems, CreateCartInput } from '../dto/create-cart.input';
import { FilterCartInput, GetCartInput } from '../dto/filter-cart.input';
import { UpdateCartInput } from '../dto/update-cart.input';
import { Cart, CartStatus } from '../entities/cart.entity';
import { CartService } from '../service/cart.service';

@Resolver(() => Cart)
export class CartResolver {
  constructor(
    private readonly cartService: CartService,
    private readonly barcodeService: BarcodeService,
    private readonly access: CaslAbilityFactory
  ) {}

  @ResolveField(() => [CartItems])
  async cartItems(@Parent() cart: Cart){
    if (!cart.items.length) return [];
    const barcodeStrigs = cart.items.map(item => ({barcode: item.barcode}))
    const barcodes = await this.barcodeService.getBatch(barcodeStrigs);
    return cart.items.map(item => ({ ...item, barcode: barcodes.find(barcode => barcode.barcode === item.barcode) }));
  }
  @ResolveField(() => Number)
  async totalAmount(@Parent() cart: Cart){
    if (!cart.items.length) return 0;
    return cart.items.reduce((acc, item) => acc = acc + item.price * item.quantity, 0)
  }
  @ResolveField(() => Number)
  async totalItemsCount(@Parent() cart: Cart){
    if (!cart.items.length) return 0;
    return cart.items.reduce((acc, item) => acc = acc + item.quantity, 0)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Cart, { nullable: true }) 
  async deleteCart(@Args('input') input: UpdateCartInput, @CurrentUser() user: User) {
    const { id } = input;
    const ability = this.access.createForUser(user);
    if (ability.can(Action.Delete, Cart)) return this.cartService.delete({ id });
    else throw new UnauthorizedException('Unauthorized');
  }
  @Mutation(() => Cart, {nullable: false})
  createCart(@Args('input') input: CreateCartInput) {
    return this.cartService.create(input);
  }

  @Mutation(() => Cart, {nullable: false})
  updateCart(@Args('input') input: UpdateCartInput) {
    const { id } = input;
    return this.cartService.update({ id }, input);
  }
  
  @Query(() => Cart, { complexity: (options: ComplexityEstimatorArgs) => options.args.count * options.childComplexity })
  async cart(@Args('input') input: GetCartInput) {
    const { id, userId } = input;
    const resp = id? await this.cartService.findOne({id}) : await this.cartService.findByFilter({userId, all: true, status: CartStatus.open, limit: 1});
    if (!resp) throw new NotFoundException('Cart not found');
    return resp
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Cart], { complexity: (options: ComplexityEstimatorArgs) => options.args.count * options.childComplexity })
  carts(@Args('input') input: FilterCartInput, @CurrentUser() user: User) {
    const ability = this.access.createForUser(user);
    if (ability.can(Action.Manage, Cart)) return this.cartService.findByFilter(input);
    else throw new UnauthorizedException('Unauthorized');
  }
}
