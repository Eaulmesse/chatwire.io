import { IsNotEmpty, IsUUID, IsString } from "class-validator";



export class CreateMessageDto {
    @IsString()
    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    @IsUUID()
    senderId: string;

    @IsNotEmpty()
    @IsUUID()
    conversationId: string;
}
