import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game, GameDocument } from '../schemas/game.schema'; // Game 인터페이스 파일 경로
import { SaveGameDto } from './dto/save-game.dto'; // DTO 파일 경로

@Injectable()
export class GameService {
  constructor(
    @InjectModel('Game') private readonly gameModel: Model<Game>,
  ) {}

  // 게임 데이터를 저장하는 메서드
  async saveGame(saveGameDto: SaveGameDto): Promise<Game> {
    const savedGame = new this.gameModel(saveGameDto);
    return savedGame.save();
  }

  async loadGamesById(id: String): Promise<Game[]> {
    return this.gameModel.find({ id }).exec();
  }
}
