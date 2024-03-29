import { Inject, Injectable } from "@nestjs/common";
import { UsersRepository } from "../repositories/users.interface";
import { CreateUserDto } from "../dtos/req/create-user.dto";
import { UpdateUserDto } from "../dtos/req/update-user.dto";
import { UpdateUserRequestBodyDto } from "../dtos/req/update-user-request-body.dto";
import { AwsS3Service } from "src/modules/core/aws-s3/aws-s3.service";

@Injectable()
export class UsersService {
  constructor(
    @Inject(UsersRepository) private readonly userRepository: UsersRepository,
    private readonly awsS3Service: AwsS3Service
  ) {}

  /**
   * @param userId
   */
  async getOneUser(userId: number) {
    const user = await this.userRepository.findOne({ id: userId });
    return user;
  }

  /**
   * @param email
   * @param name
   */
  async createUser(dto: CreateUserDto) {
    const newUser = await this.userRepository.createUser(dto);
    return newUser;
  }

  /**
   * @param userId
   * @param name
   */
  async updateUser(dto: UpdateUserRequestBodyDto) {
    const { id, name, intro, profileImageFile } = dto;

    const user = await this.userRepository.findOne({ id: id });
    // DB에서 유저프로필이미지 가 저장되어있는지 확인
    // if(user.profileImageURL) {
    //   // s3에 있는 기존의 이미지를 지운다.
    //   await this.awsS3Service.deleteImageFromS3Bucket({
    //     Key: `${id}/profiles/${}`
    //   })
    //   // s3에 새로운 프로필이미지로 업데이트한다.
    // }

    // if(profileImageFile) {

    //   // s3에 이미지를 업데이트한다.
    //   const profileImageURL = await this.awsS3Service.uploadImageToS3Bucket({
    //     Key: `${id}/profiles/${}`,
    //     Body:,
    //     ContentType: dto.,
    //   });
    // }

    // 유저정보 업데이트
    const updatedUser = await this.userRepository.updateUser({
      id: id,
      name: name,
      intro: intro,
      // profileImageURL: profileImageURL,
    });
    return updatedUser;
  }

  /**
   * @param userId
   */
  async deleteUser(userId: number) {
    const deletedUser = await this.userRepository.deleteUser(userId);
    return deletedUser;
  }
}
