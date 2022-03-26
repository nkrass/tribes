import { ComplexityEstimatorArgs, Parent, Query, ResolveField, Resolver, Args} from '@nestjs/graphql';
import { Category } from '../entities/category.model';
import { ProductCategory } from '../entities/product-category.enum';
import { ProductGender } from '../entities/product-gender.enum';
import { Product } from '../entities/product.model';
// import { Product } from '../entities/product.model';
import { CategoryService } from '../service/category.service';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(
    private categoryService: CategoryService
    // private readonly access: CaslAbilityFactory
  ) {}
  
  @ResolveField(() => [Product])
  async products(@Parent() category: Category){
    return this.categoryService.findProductsByFilter({ 
      category: category.name, gender: category.gender, inStock: true, limit: 1, all: false, count: false
    });
  }

  @ResolveField(() => Number)
  async productsCount(@Parent() category: Category){
    return (await this.categoryService.findProductsByFilter({ 
      category: category.name, gender: category.gender, inStock: true, count: true, all: true, limit: 0
    })).count;
  }

  @ResolveField(() => String)
  async coverImage(@Parent() category: Category){
    const [product] = await this.categoryService.findProductsByFilter({
      category: category.name, gender: category.gender, count: false, limit: 1, all: false, inStock: true
    })
    const [image] = product.images
    return `https://cdn.mytribes.ru/${product?.sku}/${product?.sku}-${image}.jpg`
  }

  @Query(type => Category, { complexity: (options: ComplexityEstimatorArgs) => options.args.count * options.childComplexity })
  async category(
    @Args({ name: 'name', type: () => ProductCategory, nullable: false }) name: ProductCategory,
    @Args({ name: 'gender', type: () => ProductGender, nullable: true}) gender: ProductGender): Promise<Category> {
    const cat = new Category();
    cat.name = ProductCategory[name];
    gender && (cat.gender = ProductGender[gender]);
    return cat;
  }

  @Query(() => [Category], { complexity: (options: ComplexityEstimatorArgs) => options.args.count * options.childComplexity })
  async categories(
    @Args({ name: 'gender', type: () => ProductGender, nullable: true}) gender: ProductGender): Promise<Category[]>  {
    return this.categoryService.collectCategories(gender)
  }
}
