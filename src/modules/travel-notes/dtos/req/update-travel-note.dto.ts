import { PartialType } from '@nestjs/swagger';
import { CreateTravelNoteDto } from 'src/modules/travel-notes/dtos/req/create-travel-note.dto';

export class UpdateTravelNoteDto extends PartialType(CreateTravelNoteDto) {}
