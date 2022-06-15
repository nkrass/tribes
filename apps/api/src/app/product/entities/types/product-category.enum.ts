import { registerEnumType } from '@nestjs/graphql';

enum ProductCategory {
  skirts = 'skirts',
  shorts = 'shorts',
  sundresses = 'sundresses',
  turtlenecks = 'turtlenecks',
  dresses = 'dresses',
  hoodies = 'hoodies',
  blouses = 'blouses',
  tops = 'tops',
  sweaters = 'sweaters',
  trousers = 'trousers',
  costumes = 'costumes',
  jackets = 'jackets',
  tshirts = 'tshirts',
  unset = 'unset'
}

registerEnumType(ProductCategory, {
  name: 'ProductCategory',
});

export { ProductCategory };