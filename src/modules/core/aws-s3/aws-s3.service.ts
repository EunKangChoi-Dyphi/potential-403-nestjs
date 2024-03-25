import { Injectable } from '@nestjs/common';
import { CustomConfigService } from '../config/custom-config.service';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import {
  deleteObjectCommandDto,
  getObjectCommandDto,
  putObjectCommandDto,
} from './dtos/s3-command.dto';
import ENV_KEY from '../config/constants/env-config.constant';

@Injectable()
export class AwsS3Service {
  private readonly s3Client;
  private readonly AWS_REGION;
  private readonly AWS_S3_BUCKET_NAME;
  private readonly NODE_MODE;

  constructor(private customConfigService: CustomConfigService) {
    this.NODE_MODE =
      this.customConfigService.get(ENV_KEY.NODE_ENV) ?? 'development';
    this.AWS_REGION = this.customConfigService.get(ENV_KEY.AWS_REGION);
    this.AWS_S3_BUCKET_NAME = this.customConfigService.get(
      ENV_KEY.AWS_S3_BUCKET_NAME,
    );

    this.s3Client = new S3Client({
      region: this.AWS_REGION,
      credentials: {
        accessKeyId: this.customConfigService.get(ENV_KEY.AWS_ACCESS_KEY),
        secretAccessKey: this.customConfigService.get(
          ENV_KEY.AWS_SECRET_ACCESS_KEY,
        ),
      },
    });
  }

  async uploadImageToS3Bucket(dto: putObjectCommandDto) {
    // 이미지 1개 업로드
    const putObjectCommand = new PutObjectCommand({
      Bucket: this.AWS_S3_BUCKET_NAME,
      ...dto,
    });

    await this.s3Client.send(putObjectCommand);
    return `https://s3.${this.AWS_REGION}.amazonaws.com/${this.AWS_S3_BUCKET_NAME}/${this.NODE_MODE}/${dto.Key}`;
  }

  async getImageUrlFromS3Bucket(dto: getObjectCommandDto) {
    const getObjectCommand = new GetObjectCommand({
      Bucket: this.AWS_S3_BUCKET_NAME,
      ...dto,
    });

    await this.s3Client.send(getObjectCommand);
    return `https://s3.${this.AWS_REGION}.amazonaws.com/${this.AWS_S3_BUCKET_NAME}/${this.NODE_MODE}/${dto.Key}`;
  }

  async deleteImageFromS3Bucket(dto: deleteObjectCommandDto) {
    const deleteObjectCommand = new DeleteObjectCommand({
      Bucket: this.AWS_S3_BUCKET_NAME,
      ...dto,
    });

    await this.s3Client.send(deleteObjectCommand);
  }
}
