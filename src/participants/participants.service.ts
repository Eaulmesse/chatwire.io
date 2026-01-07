import { Injectable } from '@nestjs/common';
import { Participant, Prisma} from '@prisma/client'
import { PrismaService } from 'src/prisma.services';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';


@Injectable()
export class ParticipantsService {
  constructor(private prisma: PrismaService) {}

  async findById(
    participantWhereUniqueInput: Prisma.ParticipantWhereUniqueInput,
    ): Promise<Participant | null> {
    return this.prisma.client.participant.findUnique({
      where: participantWhereUniqueInput
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ParticipantWhereUniqueInput;
    where?: Prisma.ParticipantWhereInput;
    orderBy?: Prisma.ParticipantOrderByWithRelationInput;
    } = {}): Promise<Participant[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.client.participant.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createParticipant(dto: CreateParticipantDto) {
  return this.prisma.client.participant.create({
      data: {
        user: {
          connect: { id: dto.userId }
        },
        conversation: {
          connect: { id: dto.conversationId }
        }
      }
    });
  }

  async updateParticipant(id: string, updateParticipantDto: UpdateParticipantDto) {
    return this.prisma.client.participant.update({
        where: { id },
        data: {
          ...(updateParticipantDto.userId && {
            user: { connect: { id: updateParticipantDto.userId } }
          }),
          ...(updateParticipantDto.conversationId && {
            conversation: { connect: { id: updateParticipantDto.conversationId } }
          }),
        },
    });
  };
  

  async deleteParticipant(where: Prisma.ParticipantWhereUniqueInput): Promise<Participant> {
    return this.prisma.client.participant.delete({
      where,
    });
  }
}
