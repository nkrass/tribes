import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import { ReviewKey } from 'aws-sdk/clients/alexaforbusiness';
import { CurrentUser } from '../../auth/decorators/ctx-user.decorator';
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard';
import { Action } from '../../casl/actions.eum';
import { CaslAbilityFactory } from '../../casl/casl-ability.factory';
import { User } from '../../user/entities/user.entity';
import { CreateReviewInput } from '../dto/create-review.input';
import { FilterReviewInput } from '../dto/filter-review.input';
import { UpdateReviewInput } from '../dto/update-review.input';
import { Review } from '../entities/review.model';
import { ReviewService } from '../service/review.service';

@Resolver(() => Review)
export class ReviewResolver {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly access: CaslAbilityFactory
    ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Review)
  createReview(@Args('input') input: CreateReviewInput, @CurrentUser() user: User) {
    const ability = this.access.createForUser(user);
    if (ability.can(Action.Create, Review)) return this.reviewService.create(input)
    else throw new UnauthorizedException('Unauthorized');
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Review)
  updateReview(@Args('input') input: UpdateReviewInput, @CurrentUser() user: User) {
    const { id } = input;
    const ability = this.access.createForUser(user);
    if (ability.can(Action.Update, Review)) return this.reviewService.update({id}, input)
    else throw new UnauthorizedException('Unauthorized');
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Review, {nullable: true})
  async deleteReview(@Args('input') input: UpdateReviewInput, @CurrentUser() user: User) {
    const { id } = input;
    const ability = this.access.createForUser(user);
    if (ability.can(Action.Delete, Review)) return this.reviewService.delete({ id })
    else throw new UnauthorizedException('Unauthorized');
  }

  @Query(() => Review)
  review(@Args({ name: 'id', type: ()=> String }) id: ReviewKey) {
    return this.reviewService.findOne({ id });
  }

  @Query(() => [Review])
  reviews(@Args('input') input: FilterReviewInput) {
    return this.reviewService.findByFilter(input);
  }
}
