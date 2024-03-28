import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateTravelNoteDto } from 'src/modules/travel-notes/dtos/req/create-travel-note.dto';
import { TravelNotesService } from 'src/modules/travel-notes/service/travel-notes.service';
import { UpdateTravelNoteDto } from 'src/modules/travel-notes/dtos/req/update-travel-note.dto';
import { SignInUser } from 'src/decorators/sign-in-user.decorator';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller()
export class TravelNotesController {
  constructor(private readonly travelNotesService: TravelNotesService) {}

  @Post()
  async create(
    @SignInUser() user: UserEntity,
    @Body() body: CreateTravelNoteDto,
  ) {
    return await this.travelNotesService.create(user.id, body);
  }

  @Get()
  async list(@SignInUser() user: UserEntity) {
    return await this.travelNotesService.list(user.id);
  }

  @Put(':id')
  async update(
    @SignInUser() user: UserEntity,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTravelNoteDto,
  ) {
    return await this.travelNotesService.update(user.id, id, body);
  }

  @Delete(':id')
  async delete(
    @SignInUser() user: UserEntity,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.travelNotesService.delete(user.id, id);
  }
}
