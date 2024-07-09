// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import {Express} from 'express';
import {promises as fs} from 'fs';
import {join} from 'path';


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name, 'userdbConnection') private userModel: Model<UserDocument>) {}

  async createUser(id: number, nickname: string, score:number): Promise<User> {
    const newUser = new this.userModel({ id, nickname, score });
    return newUser.save();
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUserById(id: number): Promise<User> {
    return this.userModel.findOne({ id }).exec();
  }

  async updateUser(id: number, newNickname: string): Promise<User> {
    // Step 1: 사용자를 찾습니다.
    const user = await this.userModel.findOne({ id }).exec();
    if (!user) {
      throw new DOMException('User not found');
    }

    // Step 2: 사용자의 닉네임을 업데이트하고 저장합니다.
    user.nickname = newNickname;
    await user.save();

    return user;
  }
  async userScoreUp(id: number, delta:number): Promise<User>{
    const user= await this.userModel.findOne({id}).exec();
    if(!user){
      throw new DOMException('User not found');
    }
    user.score= user.score+ delta;
    await user.save();

    return user;
  }

  async removeUser(id: number): Promise<User> {
    // Step 1: 사용자를 찾습니다.
    const user = await this.userModel.findOne({ id }).exec();
    if (!user) {
      throw new DOMException('User not found');
    }

    // Step 2: 사용자를 삭제합니다.
    await this.userModel.findOneAndDelete({ id }).exec();

    return user;
  }

  async uploadProfileImage(id: number, file: Express.Multer.File): Promise<User>{
    const user = await this.userModel.findOne({id}).exec();
    if(! user){
      throw new Error('User not found');
    }
    const uploadPath = join(__dirname, '..','..','${id}-${file.originalname}');
    await fs.writeFile(uploadPath, file.buffer);
    user.profileImageUrl =uploadPath;
    return user.save();
  }

  async getTopRankings(limit: number=10): Promise<User[]>{
    const users = await this.userModel.find().sort({ score: -1 }).exec();
    let rank = 1;
    const topRankings: User[] = [];
  
    for (const user of users) {
      if (rank <= limit) {
        user.ranking = rank;
        topRankings.push(user);
      } else {
        user.ranking = 0; // Reset rank for users beyond the top 'limit'
      }
      rank++;
      await user.save();
    }
  
    return topRankings;
  }

  async createDummyUsers(users: User[]): Promise<User[]> {
    return this.userModel.create(users);
  }

}