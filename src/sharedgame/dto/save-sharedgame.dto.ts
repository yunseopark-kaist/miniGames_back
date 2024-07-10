import { IsString, IsNotEmpty } from 'class-validator';
import { SaveGameDto } from '../../game/dto/save-game.dto';

export class SharedGameDto extends SaveGameDto {
  @IsString()
  @IsNotEmpty()
  readonly shareduserId: string;
}