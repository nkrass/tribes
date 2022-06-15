import { registerEnumType } from '@nestjs/graphql';

enum ProductRegion {
  ww = 'ww', // World Wide
  tr = 'ru', // Russia legacy
  ru = 'ru', // Russia
  id = 'id'  // Indonesia
}

registerEnumType(ProductRegion, {
  name: 'ProductRegion',
});

export { ProductRegion };