import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(
    @Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.createMessage(createMessageDto);
  }

  @Get()
  findAll() {
    return this.messagesService.findMany();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagesService.findById({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.updateMessage({ where: { id }, data: updateMessageDto});
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messagesService.deleteMessage({ id });
  }
}
