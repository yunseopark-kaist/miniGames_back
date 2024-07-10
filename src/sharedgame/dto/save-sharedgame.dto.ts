import { IsString, IsNotEmpty } from 'class-validator';

export class SharedGameDto{
  @IsString()
  @IsNotEmpty()
  readonly shareduserId: string;

  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly gameState: string; // JSON 데이터 문자열
}