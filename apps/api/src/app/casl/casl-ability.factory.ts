import { InferSubjects, Ability, AbilityBuilder, AbilityClass, ExtractSubjectType } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Cart } from "../cart/entities/cart.entity";
import { Item } from "../item/entities/item.model";
import { Order } from "../order/entities/order.model";
import { Product } from "../product/entities/product.model";
import { Review } from "../review/entities/review.model";
import { User } from "../user/entities/user.entity";
import { Action } from "./actions.eum";

type Subjects = InferSubjects<typeof User | typeof Product  | typeof Item | typeof Review | typeof Order | typeof Cart> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(Ability as AbilityClass<AppAbility>);

    if (user.userRole === 'admin' || user.userRole === 'manager') {
      can(Action.Manage, 'all'); // read-write access to everything
    }
    // } else {
    //   can(Action.Read, 'all'); // read-only access to everything
    // }
    can([Action.Read, Action.Update, Action.Delete], User, { id: user.id });
    can([Action.Read, Action.Create, Action.Update, Action.Delete], Order, { userId: user.id });
    can([Action.Read, Action.Create, Action.Update, Action.Delete], Cart, { userId: user.id });
    can([Action.Read], [Product, Item, Review, Cart]);

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: item => item.constructor as ExtractSubjectType<Subjects>
    });
  }
}