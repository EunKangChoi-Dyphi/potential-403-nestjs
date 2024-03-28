import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateTravelNoteDto } from 'src/modules/travel-notes/dtos/req/create-travel-note.dto';
import { TravelNotesService } from 'src/modules/travel-notes/service/travel-notes.service';
import { UpdateTravelNoteDto } from 'src/modules/travel-notes/dtos/req/update-travel-note.dto';


@Controller()
export class TravelNotesController {


  constructor(private readonly travelNotesService: TravelNotesService) {
  }

  @Post()
  async create(@Body() body: CreateTravelNoteDto) {
    return await this.travelNotesService.create(body);
  }

  @Get()
  async list() {
    return await this.travelNotesService.list();
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateTravelNoteDto) {
    return await this.travelNotesService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number,) {
    return await this.travelNotesService.delete(id);
  }


}