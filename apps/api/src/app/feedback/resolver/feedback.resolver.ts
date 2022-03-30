import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import { CurrentUser } from '../../auth/decorators/ctx-user.decorator';
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard';
import { Action } from '../../casl/actions.eum';
import { CaslAbilityFactory } from '../../casl/casl-ability.factory';

import { User } from '../../user/entities/user.entity';
import { CreateFeedbackInput } from '../dto/create-feedback.input';
import { FilterFeedbackInput, GetFeedbackInput } from '../dto/filter-feedback.input';
import { UpdateFeedbackInput } from '../dto/update-feedback.input';
import { Feedback, } from '../entities/feedback.model';
import { FeedbackService } from '../service/feedback.service';

@Resolver(() => Feedback)
export class FeedbackResolver {
  constructor(
    private readonly access: CaslAbilityFactory,
    private readonly feedbackService: FeedbackService
    ) {}

  @Mutation(() => Feedback)
  createFeedback(@Args('input') input: CreateFeedbackInput){ //, @CurrentUser() user: User) {
    // const ability = this.access.createForUser(user);
    // if (ability.can(Action.Create, Item)) return this.itemService.create(input) 
    // else throw new UnauthorizedException('Unauthorized');
    return this.feedbackService.create(input)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation( () => Feedback)
  updateFeedback(@Args('input') input: UpdateFeedbackInput, @CurrentUser() user: User) {
    const { id } = input;
    const ability = this.access.createForUser(user);
    if (ability.can(Action.Update, Feedback)) return this.feedbackService.update({id}, input)
    else throw new UnauthorizedException('Unauthorized');
  }

  @Mutation( () => Feedback, {nullable: true})
  @UseGuards(GqlAuthGuard)
  async deleteFeedback(@Args('input') input: UpdateFeedbackInput, @CurrentUser() user: User) {
    const { id } = input;
    const ability = this.access.createForUser(user);
    if (ability.can(Action.Delete, Feedback)) return this.feedbackService.delete({ id  })
    else throw new UnauthorizedException('Unauthorized');
  }

  @Query( () => Feedback)
  feedback(@Args('input') id: GetFeedbackInput) {
    return this.feedbackService.findOne( id );
  }

  @Query( () => [Feedback])
  feedbacks(@Args('input') input: FilterFeedbackInput) {
    return this.feedbackService.findByFilter(input);
  }

}
