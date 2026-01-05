import { Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { Conversation, Prisma} from '@prisma/client'
import { PrismaService } from 'src/prisma.services';
import { userInfo } from 'os';

@Injectable()
export class ConversationsService {
  constructor(private prisma: PrismaService) {
  }

  async findById(
    conversationtWhereUniqueInput: Prisma.ConversationWhereUniqueInput,
    ): Promise<Conversation | null> {
    return this.prisma.conversation.findUnique({
      where: conversationtWhereUniqueInput
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ConversationWhereUniqueInput;
    where?: Prisma.ConversationWhereInput;
    orderBy?: Prisma.ConversationOrderByWithRelationInput;
    }): Promise<Conversation[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.conversation.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createParticipant(data: Prisma.ConversationCreateInput): Promise<Conversation> {
    return this.prisma.conversation.create({
      data,
    });
  }

  async updateParticipant(params: {
    where: Prisma.ConversationWhereUniqueInput;
    data: Prisma.ConversationUpdateInput;
    }): Promise<Conversation> {
    const { where, data } = params;
    return this.prisma.conversation.update({
      data,
      where,
    });
  }

  async deleteConversation(where: Prisma.ConversationWhereUniqueInput): Promise<Conversation> {
    return this.prisma.conversation.delete({
      where,
    });
  }

  async findAllByUser(userId: string,
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.ConversationWhereUniqueInput;
      orderBy?: Prisma.ConversationOrderByWithRelationInput;
    }
    ){
    return this.prisma.conversation.findMany({
      skip: params.skip,
      take: params.take,
      cursor: params.cursor,
      orderBy: params.orderBy,
      where: {
        participants: { some: { userId: userId }}
      },
      include: {
        participants: {
          include: { user: {
            select: {
              id: true,
              username: true,
              email: true,
              lastSeen: true
            }
          } }
        },
        messages: {
          take: 1,
          orderBy: { createdAt: 'desc'}
        }
      }
    })
  }

  async findOneWithParticipants(conversationtWhereUniqueInput: Prisma.ConversationWhereUniqueInput,
    ): Promise<Conversation | null> {
    return this.prisma.conversation.findUnique({
      where: conversationtWhereUniqueInput,
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                email: true,
                lastSeen: true
              }
            }
          }
        }
      }
    });
  }

  async findDirectMessage(userId: string, targetId: string): Promise<Conversation | null> {
    return this.prisma.conversation.findFirst({
      where: {
        AND: [
          { participants: { some: { userId: userId }}},
          { participants: { some: { userId: targetId }}},
          {
            participants: {
              every: {
                userId: { in: [userId, targetId]}
              }
            }
          }
        ]
      }
    });
  }

}
