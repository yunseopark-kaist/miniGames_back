import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SharedGame, SharedGameDocument } from '../schemas/sharedgame.schema';
import { SharedGameDto } from './dto/save-sharedgame.dto';

@Injectable()
export class SharedGameService {
  constructor(
    @InjectModel(SharedGame.name, 'gamedbConnection') private readonly sharedGameModel: Model<SharedGameDocument>,
  ) {}

  async shareGame(sharedGameDto: SharedGameDto): Promise<SharedGame> {
    const { userId, shareduserId, name, gameState } = sharedGameDto;

    // 공유 게임 데이터 저장
    const sharedGame = new this.sharedGameModel({
      userId,
      shareduserId,
      name,
      gameState,
    });

    return sharedGame.save();
  }

  // 필요에 따라 다른 메서드 추가 가능
}
