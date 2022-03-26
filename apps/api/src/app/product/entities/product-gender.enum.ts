import { registerEnumType } from '@nestjs/graphql';

enum ProductGender {
  women = 'women',
  men = 'men',
  unisex = 'unisex',
  unset = 'unset'
}

registerEnumType(ProductGender, {
  name: 'ProductGender',
});

export { ProductGender };