import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "../dtos/req/create-user.dto";
import { UpdateUserDto } from "../dtos/req/update-user.dto";
import { UpdateUserRequestBodyDto } from "../dtos/req/update-user-request-body.dto";
import { AwsS3Service } from "src/modules/core/aws-s3/aws-s3.service";
import { PrismaService } from "src/modules/core/database/prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly awsS3Service: AwsS3Service
  ) {}

  async getOneUser(userId: number) {
    const user = this.prismaService.user.findFirst({
      where: {
        id: userId,
      },
    });
    return user;
  }

  createUser(dto: CreateUserDto) {
    const newUser = this.prismaService.user.create({
      data: {
        ...dto,
      },
    });
    return newUser;
  }

  async updateUser(dto: UpdateUserRequestBodyDto) {
    const { id, name, intro, profileImageFile } = dto;

    this.prismaService.$transaction(async (transaction) => {
      // 1. 유저정보 유무 확인
      const user = await transaction.user.findFirst({ where: { id: id } });
      if (!user) {
        throw new NotFoundException("존재하지 않은 회원입니다.");
      }

      // 2. 프로필 이미지 URL 셋팅
      const oldProfileImageS3URL = user.profileImageURL;
      const newProfileImageS3URL = profileImageFile
        ? this.awsS3Service.publishS3URL(`profiles/${id}/${profileImageFile.originalname}`)
        : oldProfileImageS3URL;

      // 3. 유저정보를 업데이트한다
      const updatedUser = await transaction.user.update({
        where: {
          id: id,
        },
        data: {
          name: name ?? user.name,
          intro: intro ?? user.intro,
          profileImageURL: newProfileImageS3URL,
        },
      });

      // 4. DB 트랜잭션처리 완료후, 프로필이미지 파일이 존재할때, S3 업데이트
      if (profileImageFile) {
        // 4-1. DB에서 유저프로필이미지가 존재하는지 확인 확인
        if (user.profileImageURL) {
          // 기존의 이미지와 디렉토리를 지운다
          await this.awsS3Service.deleteImageFromS3Bucket({
            Key: `profiles/${id}`,
          });

          // 4-2. s3에 새로운 프로필이미지로 업데이트한다.
          await this.awsS3Service.uploadImageToS3Bucket({
            Key: `profiles/${id}/${profileImageFile.originalname}`,
          });
        }
      }

      return updatedUser;
    });
  }

  deleteUser(userId: number) {
    const deletedUser = this.prismaService.user.delete({
      where: { id: userId },
    });
    return deletedUser;
  }
}
