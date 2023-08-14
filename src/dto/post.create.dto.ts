import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class PostCreateDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(20)
  content: string;
}
