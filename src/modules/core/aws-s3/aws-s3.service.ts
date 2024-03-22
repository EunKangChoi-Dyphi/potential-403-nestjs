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

@Injectable()
export class AwsS3Service {
  private readonly s3Client;
  private readonly AWS_REGION;
  private readonly AWS_S3_BUCKET_NAME;

  constructor(private customConfigService: CustomConfigService) {
    this.AWS_REGION = this.customConfigService.get('AWS_REGION');
    this.AWS_S3_BUCKET_NAME =
      this.customConfigService.get('AWS_S3_BUCKET_NAME');

    this.s3Client = new S3Client({
      region: this.AWS_REGION,
      credentials: {
        accessKeyId: this.customConfigService.get('AWS_ACCESS_KEY'),
        secretAccessKey: this.customConfigService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  async uploadImageToS3Bucket(dto: putObjectCommandDto) {
    const putObjectCommand = new PutObjectCommand({
      Bucket: this.AWS_S3_BUCKET_NAME,
      ...dto,
    });

    await this.s3Client.send(putObjectCommand);

    // 업로드된 이미지의 S3 버킷 URL 반환
    return `https://s3.${this.AWS_REGION}.amazonaws.com/${this.AWS_S3_BUCKET_NAME}/${dto.Key}`;
  }

  async getImageUrlFromS3Bucket(dto: getObjectCommandDto) {
    const getObjectCommand = new GetObjectCommand({
      Bucket: this.AWS_S3_BUCKET_NAME,
      ...dto,
    });

    await this.s3Client.send(getObjectCommand);
  }

  async deleteImageFromS3Bucket(dto: deleteObjectCommandDto) {
    const deleteObjectCommand = new DeleteObjectCommand({
      Bucket: this.AWS_S3_BUCKET_NAME,
      ...dto,
    });

    await this.s3Client.send(deleteObjectCommand);
  }
}
