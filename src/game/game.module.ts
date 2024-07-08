import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { Game, GameSchema } from '../schemas/game.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }], 'gamedbConnection'), // Game 스키마를 Mongoose에 등록
  ],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
