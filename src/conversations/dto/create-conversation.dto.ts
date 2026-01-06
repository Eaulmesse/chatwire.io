import { IsArray, IsString, IsOptional, ArrayMinSize } from 'class-validator';

export class CreateConversationDto {
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1) 
  participantIds: string[];

  @IsOptional()
  @IsString()
  name?: string; 
}