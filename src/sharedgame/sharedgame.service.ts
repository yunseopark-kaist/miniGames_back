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
    // 공유 게임 데이터 저장
    const sharedGame = new this.sharedGameModel(sharedGameDto);
    return sharedGame.save();
  } catch (error){
    console.error('Error saving shared game:', error);
    throw new Error('Error saving shared game');
  }

  async getSharedGames(userId: string): Promise<SharedGame[]> {
    // shareduserId가 userId와 일치하는 게임 데이터를 가져옴
    return this.sharedGameModel.find({ shareduserId: userId }).exec();
}

  // 필요에 따라 다른 메서드 추가 가능
}
