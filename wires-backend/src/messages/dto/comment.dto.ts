import { IsOptional, IsString } from 'class-validator';

export class commentDto {
  @IsString()
  comment: string;

  @IsOptional()
  user: string;
}
