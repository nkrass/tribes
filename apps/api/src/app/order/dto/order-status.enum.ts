import { registerEnumType } from '@nestjs/graphql';

enum OrderStatus {
  new = 'new',
  processing = 'processing',
  confirmed = 'confirmed',
  delivering = 'delivering',
  done = 'done',
  returning = 'returning',
  returned = 'returned',
  cancelled = 'cancelled'
}

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
});

export { OrderStatus };
