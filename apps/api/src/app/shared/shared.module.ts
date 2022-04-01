import { Module } from '@nestjs/common';
import { GoogleServices } from './googledoc.service';
import { UploadMediaService } from './upload-media.service';

@Module({
  imports: [],
  providers: [GoogleServices, UploadMediaService],
  // controllers: [ProductController],
  exports: [GoogleServices, UploadMediaService],
})
export class SharedModule {}
