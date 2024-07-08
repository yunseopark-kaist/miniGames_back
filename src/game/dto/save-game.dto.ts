import { IsString, IsNotEmpty } from 'class-validator';

export class SaveGameDto {
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