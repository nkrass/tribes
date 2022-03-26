import { Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';
import { CaslModule } from '../casl/casl.module';
// import { ReviewController } from './controller/review.controller';
import { ReviewResolver } from './resolver/review.resolver';
import { ReviewSchema } from './schema/review.schema';
import { ReviewService } from './service/review.service';

@Module({
  imports: [
    CaslModule,
    DynamooseModule.forFeature([
      {
        name: 'review',
        schema: ReviewSchema,
      },
    ])
  ],
  providers: [ReviewService, ReviewResolver],
  // controllers: [ReviewController],
  exports: [ReviewService]
})
export class ReviewModule {}
