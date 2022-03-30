import { forwardRef, Inject, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, ComplexityEstimatorArgs, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import { CurrentUser } from '../../auth/decorators/ctx-user.decorator';
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard';
import { Action } from '../../casl/actions.eum';
import { CaslAbilityFactory } from '../../casl/casl-ability.factory';
import { Review } from '../../review/entities/review.model';
import { ReviewService } from '../../review/service/review.service';
import { User } from '../../user/entities/user.entity';
import { CreateBarcodeInput } from '../dto/create-barcode.input';
import { FilterBarcodeInput, GetBarcodeInput } from '../dto/filter-barcode.input';
import { UpdateBarcodeInput } from '../dto/update-barcode.input';
import { Barcode } from '../entities/barcode.model';
import { Product } from '../entities/product.model';
import { BarcodeService } from '../service/barcode.service';
import { ProductService } from '../service/product.service';

@Resolver(() => Barcode)
export class BarcodeResolver {
  constructor(
    private readonly productService: ProductService, 
    private readonly barcodeService: BarcodeService,
    private readonly access: CaslAbilityFactory,
    @Inject(forwardRef(() => ReviewService))
    private readonly reviewsService: ReviewService,
  ) {}
  
  @ResolveField(() => Product)
  async product(@Parent() barcode: Barcode){
    return this.productService.findOne({sku: barcode.sku});
  }
  
  @ResolveField(() => [Review])
  reviews(@Parent() barcode: Barcode){
    const reviews = this.reviewsService.findBySku(barcode.sku);
    return reviews
  }
  @ResolveField(() => Number)
  async rating(@Parent() barcode: Barcode){
    const reviews = await this.reviewsService.findBySku(barcode.sku);
    if (reviews.length === 0) return 0;
    const rating = Math.ceil(reviews.map(review => review.reviewRating).reduce((a, b) => a + b, 0) / reviews.length);
    return rating
  }
  @ResolveField(() => [String])
  async imagesSrc(@Parent() barcode: Barcode){
    return barcode.images.map(s => `https://cdn.mytribes.ru/${barcode.sku}/${barcode.sku}-${s}.jpg`)
  }
  @ResolveField(() => String)
  async coverImage(@Parent() barcode: Barcode){
    return `https://cdn.mytribes.ru/${barcode.sku}/${barcode.sku}-${barcode.images[0]}.jpg`
  }
  @ResolveField(() => [String])
  async videosSrc(@Parent() barcode: Barcode){
    return barcode.videos.map(s => `https://cdn.mytribes.ru/${barcode.sku}/${barcode.sku}-${s}.mov`)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Barcode)
  createBarcode(@Args('input') input: CreateBarcodeInput, @CurrentUser() user: User) {
    const ability = this.access.createForUser(user);
    if (ability.can(Action.Create, Product)) return this.barcodeService.create(input)
    else throw new UnauthorizedException('Unauthorized');
  }
  
  @UseGuards(GqlAuthGuard)
  @Mutation(() => [Barcode])
  processBarcodes(@Args('input') start: boolean, @CurrentUser() user: User) {
    const ability = this.access.createForUser(user);
    if (ability.can(Action.Create, Product) && start) return this.barcodeService.createBatch();
    else throw new UnauthorizedException('Unauthorized');
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Barcode)
  updateBarcode(@Args('input') input: UpdateBarcodeInput, @CurrentUser() user: User) {
    const { barcode } = input;
    const ability = this.access.createForUser(user);
    if (ability.can(Action.Update, Product)) return this.barcodeService.update({ barcode }, input)
    else throw new UnauthorizedException('Unauthorized');
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Barcode, { nullable: true }) 
  async deleteBarcode(@Args('input') input: UpdateBarcodeInput, @CurrentUser() user: User) {
    const { barcode } = input;
    const ability = this.access.createForUser(user);
    if (ability.can(Action.Delete, Product)) return this.barcodeService.delete({ barcode });
    else throw new UnauthorizedException('Unauthorized');
  }

  @Query(() => Barcode, { complexity: (options: ComplexityEstimatorArgs) => options.args.count * options.childComplexity })
  barcode(@Args('input') input: GetBarcodeInput) {
    const { barcode } = input;
    return this.barcodeService.findOne({ barcode });
  }

  @Query(() => [Barcode], { complexity: (options: ComplexityEstimatorArgs) => options.args.count * options.childComplexity })
  barcodes(@Args('input') input: FilterBarcodeInput) {
    return this.barcodeService.findByFilter(input);
  }
  // @Query(() => [Barcode], { complexity: (options: ComplexityEstimatorArgs) => options.args.count * options.childComplexity })
  // async cartBarcodes(@Args({ name: 'input', type: () => [GetBarcodeInput]}) input: [GetBarcodeInput]){
  //   return this.barcodeService.getBatchBySkus(input);
  // }
}
