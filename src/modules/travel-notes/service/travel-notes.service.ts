import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTravelNoteDto } from '../dtos/req/create-travel-note.dto';
import { UpdateTravelNoteDto } from 'src/modules/travel-notes/dtos/req/update-travel-note.dto';
import { AwsS3Service } from 'src/modules/core/aws-s3/aws-s3.service';
import { v4 as uuidv4 } from 'uuid';
import { TravelImageEntity } from 'src/modules/travel-notes/entities/travel-image.entity';
import { PrismaService } from 'src/modules/core/database/prisma/prisma.service';
import { putObjectCommandDto } from 'src/modules/core/aws-s3/dtos/s3-command.dto';
import { Prisma } from '@prisma/client';


const select: Prisma.TravelNoteSelect = {
  id: true,
  title: true,
  startDate: true,
  endDate: true,
  review: true,
  createdAt: true,
  userId: true,
  city: {
    select: {
      id: true,
      name: true,
    },
  },
  images: {
    select: {
      id: true,
      sequence: true,
      url: true,
      isMain: true,
    },
  },
};

@Injectable()
export class TravelNotesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly awsS3Service: AwsS3Service,
  ) {}

  async create(
    userId: number,
    dto: CreateTravelNoteDto,
    images: { sequence: number; file: Express.Multer.File }[],
  ) {
    dto.validate();

    return this.prismaService.$transaction(async transaction => {
      const travelNote = await transaction.travelNote.create({
        data: {
          userId,
          cityId: dto.cityId,
          cityName: dto.cityName,
          title: dto.title,
          startDate: dto.startDate.toString(),
          endDate: dto.endDate.toString(),
          review: dto.review,
        },
      });

      if (images.length > 0) {
        // 메인 이미지 인덱스
        const mainImageIndex = images.some(
          (image) => image.sequence === dto.mainImageIndex,
        )
          ? dto.mainImageIndex
          : 1;

        for (const image of images) {
          // 이미지를 스토리지에 저자

          const request: putObjectCommandDto = {
            Key: `travel-notes/${travelNote.id}/${uuidv4()}`,
            // @ts-ignore
            Body: image.file.buffer,
            ContentType: image.file.mimetype,
          };
          const { url, Key } = await this.awsS3Service.uploadImageToS3Bucket(request);

          // 여행 일지 이미지 엔티티 생성
          await transaction.travelImage.create({
            data: {
              sequence: image.sequence,
              url: url,
              key: Key,
              isMain: image.sequence === mainImageIndex,
              travelNoteId: travelNote.id,
            },
          });
        }

        return transaction.travelNote.findFirst({
          where: { id: travelNote.id },
          select
        });
      }
    });
  }

  list(userId: number) {
    return this.prismaService.travelNote.findMany({
      where: { userId },
      select
    });
  }

  delete(userId: number, id: number) {
    return this.prismaService.$transaction(async transaction => {
      const travelNote = await transaction.travelNote.findUnique({
        where: { id, userId },
        include: { images: true },
      });

      if (!travelNote) {
        throw new NotFoundException('존재 하지 않는 여행 일지 입니다.');
      }

      // 이미지 삭제
      await Promise.all(
        travelNote.images.map((image) =>
          this.awsS3Service.deleteImageFromS3Bucket({ Key: image.key }),
        ),
      );

      await transaction.travelNote.delete({
        where: { id },
      });

    });
  }

  update(
    userId: number,
    travelNoteId: number,
    dto: UpdateTravelNoteDto,
    images: { sequence: number; file: Express.Multer.File }[],
  ) {

    dto.validate();

    return this.prismaService.$transaction(async transaction => {

      const travelNote = await transaction.travelNote.findUnique({
        where: { id: travelNoteId, userId },
        include: { images: true },
      });

      if (!travelNote) {
        throw new NotFoundException('존재 하지 않는 여행 일지 입니다.');
      }

      await transaction.travelNote.update({
        where: { id: travelNoteId },
        data: {
          cityId: dto.cityId,
          cityName: dto.cityName,
          title: dto.title,
          startDate: dto.startDate.toString(),
          endDate: dto.endDate.toString(),
          review: dto.review,
        },
      });

      /**
       * 이미지 업데이트 예시
       *      1 | 2 | 3 | ... | 6
       * 기존  A | B |
       * 요청    | C | D
       *  => B 삭제 & C, D 추가
       */
      //

      // 기존 이미지 삭제
      const newImageSequences = images.map(image => image.sequence);
      await Promise.all(
        // 기존 이미지 중에 새로 입력한 이미지의 자리 확인
        travelNote.images.filter(it => newImageSequences.includes(it.sequence))
          .map(async deletedImage => {
            // S3에서 이미지 삭제
            await this.awsS3Service.deleteImageFromS3Bucket({ Key: deletedImage.key });
            // 이미지 삭제
            await transaction.travelImage.delete({
              where: { id: deletedImage.id }
            });
          })
      );


      if (images.length > 0) {
        for (const image of images) {
          // 이미지를 스토리지에 저장
          const request: putObjectCommandDto = {
            Key: `travel-notes/${travelNote.id}/${uuidv4()}`,
            // @ts-ignore
            Body: image.file.buffer,
            ContentType: image.file.mimetype,
          };
          const { url, Key } = await this.awsS3Service.uploadImageToS3Bucket(request);

          await transaction.travelImage.create({
            data: {
              sequence: image.sequence,
              url: url,
              key: Key,
              isMain: false,
              travelNoteId: travelNote.id,
            },
          });
        }
      }

      // 메인 이미지 설정
      if (dto.mainImageIndex) {
        const images = await transaction.travelImage.findMany({
          where: { travelNoteId },
        });
        for (const image of images) {
          await this.prismaService.travelImage.update({
            where: { id: image.id },
            data: {
              isMain: image.sequence === dto.mainImageIndex,
            },
          });
        }
      }
    });

  }

}
