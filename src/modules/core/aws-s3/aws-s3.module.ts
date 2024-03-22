import { Module } from '@nestjs/common';
import { AwsS3Service } from './aws-s3.service';
import { CustomConfigModule } from 'src/modules/core/config/custom-config.module';

@Module({
  imports: [CustomConfigModule],
  providers: [AwsS3Service],
  exports: [AwsS3Service],
})
export class AwsS3Module {}
