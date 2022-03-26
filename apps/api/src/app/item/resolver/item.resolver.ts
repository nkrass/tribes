import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import { ReviewKey } from 'aws-sdk/clients/alexaforbusiness';
import { CurrentUser } from '../../auth/decorators/ctx-user.decorator';
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard';
import { Action } from '../../casl/actions.eum';
import { CaslAbilityFactory } from '../../casl/casl-ability.factory';
import { Barcode } from '../../product/entities/barcode.model';
import { Product } from '../../product/entities/product.model';
import { BarcodeService } from '../../product/service/barcode.service';
import { ProductService } from '../../product/service/product.service';
import { User } from '../../user/entities/user.entity';
import { CreateItemInput } from '../dto/create-item.input';
import { FilterItemInput } from '../dto/filter-item.input';
import { UpdateItemInput } from '../dto/update-item.input';
import { Item } from '../entities/item.model';
import { ItemService } from '../service/item.service';

@Resolver(() => Item)
export class ItemResolver {
  constructor(
    private readonly itemService: ItemService,
    private readonly productService: ProductService,
    private readonly barcodeService: BarcodeService,
    private readonly access: CaslAbilityFactory
    ) {}

  @ResolveField(() => Product)
  async product(@Parent() item: Item){
    const { sku } = await this.barcodeService.findOne({barcode: item.productBarcode});
    if (sku) return this.productService.findOne({ sku })
    else return null
  }
  @ResolveField(() => Barcode)
  async barcode(@Parent() item: Item){
    return this.barcodeService.findOne({barcode: item.productBarcode});
  }

  // @UseGuards(GqlAuthGuard)
  @Mutation(() => Item)
  createItem(@Args('input') input: CreateItemInput){ //, @CurrentUser() user: User) {
    // const ability = this.access.createForUser(user);
    // if (ability.can(Action.Create, Item)) return this.itemService.create(input) 
    // else throw new UnauthorizedException('Unauthorized');
    return this.itemService.create(input)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(/* istanbul ignore next */ () => Item)
  updateItem(@Args('input') input: UpdateItemInput, @CurrentUser() user: User) {
    const { id } = input;
    const ability = this.access.createForUser(user);
    if (ability.can(Action.Update, Item)) return this.itemService.update({id}, input)
    else throw new UnauthorizedException('Unauthorized');
  }

  @Mutation(/* istanbul ignore next */ () => Item, {nullable: true})
  @UseGuards(GqlAuthGuard)
  async deleteItem(@Args('input') input: UpdateItemInput, @CurrentUser() user: User) {
    const { id } = input;
    const ability = this.access.createForUser(user);
    if (ability.can(Action.Delete, Item)) return this.itemService.delete({ id  })
    else throw new UnauthorizedException('Unauthorized');
  }

  @Query(/* istanbul ignore next */ () => Item)
  item(@Args({ name: 'id', type: () => String }) id: ReviewKey) {
    return this.itemService.findOne({ id });
  }

  @Query(/* istanbul ignore next */ () => [Item])
  items(@Args('input') input: FilterItemInput) {
    return this.itemService.findByFilter(input);
  }

}
