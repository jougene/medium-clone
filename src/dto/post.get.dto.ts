import { IsNumberString } from 'class-validator';

export class PostGetDto {
  @IsNumberString()
  id: number;
}
