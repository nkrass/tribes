import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<number, Date|null> {
  description = 'Date custom scalar type';

  parseValue(value: number|unknown): Date {
    return new Date(value as number); // value from the client
  }

  serialize(value: any): number {
    return (new Date(value) as any); // value sent to the client
  }

  parseLiteral(ast: ValueNode): Date|null {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return null;
  }
}