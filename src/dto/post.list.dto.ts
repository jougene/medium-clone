import { IsNumberString, IsOptional } from 'class-validator';

export class PostListDto {
  @IsOptional()
  @IsNumberString()
  page: number;

  @IsOptional()
  @IsNumberString()
  perPage: number;
}
