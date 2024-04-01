import { Injectable } from "@nestjs/common";
import { CustomConfigService } from "../config/custom-config.service";
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { deleteObjectCommandDto, getObjectCommandDto, putObjectCommandDto } from "./dtos/s3-command.dto";
import ENV_KEY from "../config/constants/env-config.constant";
import { Readable } from "stream";

@Injectable()
export class AwsS3Service {
  private readonly s3Client;
  private readonly AWS_REGION;
  private readonly AWS_S3_BUCKET_NAME;
  private readonly NODE_MODE;

  constructor(private customConfigService: CustomConfigService) {
    this.NODE_MODE = this.customConfigService.get(ENV_KEY.NODE_ENV) ?? "development";
    this.AWS_REGION = this.customConfigService.get(ENV_KEY.AWS_REGION);
    this.AWS_S3_BUCKET_NAME = this.customConfigService.get(ENV_KEY.AWS_S3_BUCKET_NAME);

    this.s3Client = new S3Client({
      region: this.AWS_REGION,
      credentials: {
        accessKeyId: this.customConfigService.get(ENV_KEY.AWS_ACCESS_KEY),
        secretAccessKey: this.customConfigService.get(ENV_KEY.AWS_SECRET_ACCESS_KEY),
      },
    });
  }

  publishS3URL(Key: string) {
    /**
     * 1) 이미지 프로필 변경
     * Key: profiles/{user-id}/{new-profile-image-file-name}
     */
    const url = `https://${this.AWS_S3_BUCKET_NAME}.s3.${this.AWS_REGION}.amazonaws.com/${this.NODE_MODE}/${Key}`;
    return url;
  }

  async uploadImageToS3Bucket(dto: putObjectCommandDto) {
    const Key = `${this.NODE_MODE}/${dto.Key}`;

    // 이미지 1개 업로드
    const putObjectCommand = new PutObjectCommand({
      Bucket: this.AWS_S3_BUCKET_NAME,
      Key: Key,
      Body: dto.Body,
      ContentType: dto.ContentType,
    });

    await this.s3Client.send(putObjectCommand);
    return {
      Key: Key,
      url: `https://${this.AWS_S3_BUCKET_NAME}.s3.${this.AWS_REGION}.amazonaws.com/${Key}`,
    };
  }

  async getImageUrlFromS3Bucket(dto: getObjectCommandDto) {
    const getObjectCommand = new GetObjectCommand({
      Bucket: this.AWS_S3_BUCKET_NAME,
      ...dto,
    });

    await this.s3Client.send(getObjectCommand);
    return this.publishS3URL(dto.Key);
  }

  async deleteImageFromS3Bucket(dto: deleteObjectCommandDto) {
    const deleteObjectCommand = new DeleteObjectCommand({
      Bucket: this.AWS_S3_BUCKET_NAME,
      ...dto,
    });

    await this.s3Client.send(deleteObjectCommand);
  }
}
