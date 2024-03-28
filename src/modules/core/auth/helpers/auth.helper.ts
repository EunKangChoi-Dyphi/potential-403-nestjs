import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthHelper {
  constructor(private readonly httpService: HttpService) {}
}
