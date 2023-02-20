import { IsString, IsOptional } from 'class-validator';

export class FindMessageDto {
  @IsString()
  @IsOptional()
  search?: string;

  @IsOptional()
  date?: Date;

  @IsOptional()
  user?: string;
}
