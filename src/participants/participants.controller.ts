import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Post()
  create(
    @Body() createParticipantDto: CreateParticipantDto) {
    return this.participantsService.createParticipant(createParticipantDto);
  }

  @Get()
  findAll() {
    return this.participantsService.findMany();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.participantsService.findById({ id });
  }

 @Patch(':id')
  update(@Param('id') id: string, @Body() updateParticipantDto: UpdateParticipantDto) {
    return this.participantsService.updateParticipant(id, updateParticipantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.participantsService.deleteParticipant({ id });
  }
}
