import { IsNumberString, IsOptional } from 'class-validator';

export class UserListDto {
  @IsOptional()
  @IsNumberString()
  page: number;

  @IsOptional()
  @IsNumberString()
  perPage: number;
}
