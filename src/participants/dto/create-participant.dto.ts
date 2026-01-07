import { IsEmpty, IsInt, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateParticipantDto {
    @IsUUID()
    @IsNotEmpty()
    userId: string;

    @IsUUID()
    @IsNotEmpty()
    conversationId: string;
}
