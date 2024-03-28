import { LocalDate } from '@js-joda/core';
import { BadRequestException } from '@nestjs/common';
import { TransformFnParams } from 'class-transformer/types/interfaces';

export const toLocalDate = (message?: string) => {
  return (params: TransformFnParams): any => {
    try {
      return LocalDate.parse(params.value);
    } catch(e) {
      throw new BadRequestException(message || '날짜 형식이 아닙니다. [YYYY-MM-DD]');
    }
  }
};
