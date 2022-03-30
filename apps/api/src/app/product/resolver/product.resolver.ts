import { forwardRef, Inject, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, ComplexityEstimatorArgs, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import { CurrentUser } from '../../auth/decorators/ctx-user.decorator';
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard';
import { Action } from '../../casl/actions.eum';
import { CaslAbilityFactory } from '../../casl/casl-ability.factory';
import { Review } from '../../review/entities/review.model';
import { ReviewService } from '../../review/service/review.service';
import { User } from '../../user/entities/user.entity';
import { CreateProductInput } from '../dto/create-product.input';
import { GetProductInput, FilterProductInput } from '../dto/filter-product.input';
import { UpdateProductInput } from '../dto/update-product.input';
import { Barcode } from '../entities/barcode.model';
import { Product } from '../entities/product.model';
import { BarcodeService } from '../service/barcode.service';
import { ProductService } from '../service/product.service';

@Resolver(() => Product)
export class ProductResolver {
  constructor(
    private readonly productService: ProductService, 
    @Inject(forwardRef(() => ReviewService))
    private readonly reviewsService: ReviewService,
    private readonly barcodesService: BarcodeService,
    private readonly access: CaslAbilityFactory
  ) {}
  
  @ResolveField(() => [Review])
  reviews(@Parent() product: Product){
    const reviews = this.reviewsService.findBySku(product.sku);
    return reviews
  }
  @ResolveField(() => Number)
  async rating(@Parent() product: Product){
    const reviews = await this.reviewsService.findBySku(product.sku);
    if (reviews.length === 0) return 0;
    const rating = Math.ceil(reviews.map(review => review.reviewRating).reduce((a, b) => a + b, 0) / reviews.length);
    return rating
  }
  @ResolveField(() => [Barcode])
  async barcodes(@Parent() product: Product){
    return this.barcodesService.findBySku(product.sku);
  }
  @ResolveField(() => [Product])
  async variants(@Parent() product: Product){
    return this.productService.findBySkuFamily(product.skuFamily)
  }
  @ResolveField(() => [String])
  async imagesSrc(@Parent() product: Product){
    return product.images.map(s => `https://cdn.mytribes.ru/${product.sku}/${product.sku}-${s}.jpg`)
  }
  @ResolveField(() => String)
  async coverImage(@Parent() product: Product){
    return `https://cdn.mytribes.ru/${product.sku}/${product.sku}-${product.images[0]}.jpg`
  }
  @ResolveField(() => [String])
  async videosSrc(@Parent() product: Product){
    return product.videos.map(s => `https://cdn.mytribes.ru/${product.sku}/${product.sku}-${s}.mov`)
  }
  @ResolveField(() => [Product], {nullable: true})
  async crossSaleProducts(@Parent() product: Product){
    const queries = product.crossSale.map(async s => await this.productService.findBySkuFamily(s))
    const results: any = []
    for await (const res of queries) {
      results.push(res)
    }
    return results.flat(1)
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Product)
  createProduct(@Args('input') input: CreateProductInput, @CurrentUser() user: User) {
    const ability = this.access.createForUser(user);
    if (ability.can(Action.Create, Product)) return this.productService.create(input)
    else throw new UnauthorizedException('Unauthorized');
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(() => [Product])
  processProducts(@Args('input') start: boolean, @CurrentUser() user: User) {
    const ability = this.access.createForUser(user);
    if (ability.can(Action.Create, Product) && start) return this.productService.createBatch();
    else throw new UnauthorizedException('Unauthorized');
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Product)
  updateProduct(@Args('input') input: UpdateProductInput, @CurrentUser() user: User) {
    const { sku } = input;
    const ability = this.access.createForUser(user);
    if (ability.can(Action.Update, Product)) return this.productService.update({ sku }, input)
    else throw new UnauthorizedException('Unauthorized');
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Product, { nullable: true }) 
  async deleteProduct(@Args('input') input: UpdateProductInput, @CurrentUser() user: User) {
    const { sku } = input;
    const ability = this.access.createForUser(user);
    if (ability.can(Action.Delete, Product)) return this.productService.delete({ sku });
    else throw new UnauthorizedException('Unauthorized');
  }

  @Query(() => Product, { complexity: (options: ComplexityEstimatorArgs) => options.args.count * options.childComplexity })
  product(@Args('input') input: GetProductInput) {
    return this.productService.findOne(input);
  }

  @Query(() => [Product], { complexity: (options: ComplexityEstimatorArgs) => options.args.count * options.childComplexity })
  async products(@Args('input') input: FilterProductInput) {
    if (input.size) {
      const barcodes = await this.barcodesService.findByFilter({
        size: input.size, 
        all: input.all, 
        inStock: input.inStock, limit: input.limit
      })
      return this.productService.getBatchBySkus(barcodes.map(b => ({sku: b.sku})));
    }
    return this.productService.findByFilter(input);
  }

  // @Mutation(() => [Product])
  // upload(@Args('input') process: boolean) {
  //   // return this.productService.findBySkuFamily();
  // }
}
