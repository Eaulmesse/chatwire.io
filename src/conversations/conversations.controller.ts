import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { PrismaService } from 'src/prisma.services';
import { Conversation, Prisma} from '@prisma/client'

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post()
  create(
    @Query('creatorId') creatorId : string,
    @Body() createConversationDto: CreateConversationDto) {
    return this.conversationsService.createConversation(creatorId, createConversationDto);
  }

  @Get()
  findAll() {
    return this.conversationsService.findMany();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conversationsService.findById({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConversationDto: UpdateConversationDto) {
    return this.conversationsService.updateConversation({where: { id }, data: updateConversationDto  });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conversationsService.deleteConversation({ id });
  }
}
