import { forwardRef, Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';
import { CaslModule } from '../casl/casl.module';
import { ProductModule } from '../product/product.module';
import { GoogleServices } from '../shared/googledoc.service';
import { SharedModule } from '../shared/shared.module';
// import { ReviewController } from './controller/review.controller';
import { ReviewResolver } from './resolver/review.resolver';
import { ReviewSchema } from './schema/review.schema';
import { ReviewService } from './service/review.service';

@Module({
  imports: [
    CaslModule, SharedModule, forwardRef(() => ProductModule),
    DynamooseModule.forFeature([
      {
        name: 'review',
        schema: ReviewSchema,
      },
    ])
  ],
  providers: [ReviewService, ReviewResolver, GoogleServices],
  // controllers: [ReviewController],
  exports: [ReviewService]
})
export class ReviewModule {}
