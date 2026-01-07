import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConversationsModule } from './conversations/conversations.module';
import { ParticipantsModule } from './participants/participants.module';
import { MessagesModule } from './messages/messages.module';
import { PrismaModule } from './prisma.module'
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, ConversationsModule, ParticipantsModule, MessagesModule, PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
