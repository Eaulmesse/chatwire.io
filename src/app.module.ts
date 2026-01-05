import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConversationsModule } from './conversations/conversations.module';
import { ParticipantsModule } from './participants/participants.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [UsersModule, ConversationsModule, ParticipantsModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
