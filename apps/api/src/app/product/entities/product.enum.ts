import { registerEnumType } from '@nestjs/graphql';

enum ProductStatus {
  available = 'available',
  soldout = 'soldout',
  deleted = 'deleted',
  draft = 'draft'
}

registerEnumType(ProductStatus, {
  name: 'ProductStatus',
});

export { ProductStatus };