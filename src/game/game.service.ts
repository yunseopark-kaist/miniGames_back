import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game, GameDocument } from '../schemas/game.schema';
import { SaveGameDto } from './dto/save-game.dto';

@Injectable()
export class GameService {
  constructor(
    @InjectModel(Game.name, 'gamedbConnection') private readonly gameModel: Model<GameDocument>,
  ) {}

  async saveGame(saveGameDto: SaveGameDto): Promise<Game> {
    const savedGame = new this.gameModel(saveGameDto);
    return savedGame.save();
  }

  async loadGamesByUserId(userId: String): Promise<Game[]> {
    return this.gameModel.find({ userId }).exec();
  }
}
