import { Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';
import { CaslModule } from '../casl/casl.module';
import { FeedbackResolver } from './resolver/feedback.resolver';
import { FeedbackSchema } from './schema/feedback.schema';
import { FeedbackService } from './service/feedback.service';

@Module({
  imports: [
    CaslModule,
    DynamooseModule.forFeature([
      {
        name: 'feedback',
        schema: FeedbackSchema,
      },
    ])
  ],
  providers: [FeedbackResolver, FeedbackService],
  exports: [FeedbackService]
})
export class FeedbackModule {}
