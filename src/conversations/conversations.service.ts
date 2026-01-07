import { Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { Conversation, Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.services';


@Injectable()
export class ConversationsService {
  constructor(private prisma: PrismaService) {
  }

  async findById(
    conversationtWhereUniqueInput: Prisma.ConversationWhereUniqueInput,
    ): Promise<Conversation | null> {
    return this.prisma.client.conversation.findUnique({
      where: conversationtWhereUniqueInput
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ConversationWhereUniqueInput;
    where?: Prisma.ConversationWhereInput;
    orderBy?: Prisma.ConversationOrderByWithRelationInput;
    } = {}): Promise<Conversation[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.client.conversation.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createConversation(creatorId: string, dto: CreateConversationDto): Promise<Conversation> {
    const allParticipantsIds = [creatorId, ...dto.participantIds];
    return this.prisma.client.conversation.create({
      data: {
        participants: {
          create: allParticipantsIds.map(id => ({
            user: {
              connect: { id: id }
            }
          }))
        }
      },
      include: {
        participants: {
          include: { user: true }
        }
      }
    });
  }

  async updateConversation(params: {
    where: Prisma.ConversationWhereUniqueInput;
    data: UpdateConversationDto;
    }): Promise<Conversation> {
    const { where, data } = params;
    return this.prisma.client.conversation.update(params);
  }

  async deleteConversation(where: Prisma.ConversationWhereUniqueInput): Promise<Conversation> {
    return this.prisma.client.conversation.delete({
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
    return this.prisma.client.conversation.findMany({
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
    return this.prisma.client.conversation.findUnique({
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
    return this.prisma.client.conversation.findFirst({
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
