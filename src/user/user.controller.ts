// src/user/user.controller.ts
//엔드포인트를 정의

import { Controller, Get, Post, Body, Param, Query,Put ,Delete, UseInterceptors, UploadedFile} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../schemas/user.schema';
import {Express} from 'express';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body('id') id: number, @Body('nickname') nickname: string): Promise<User> {
    return this.userService.createUser(id, nickname,0);
  }

  @Get()
  async getUsers(@Query('id') id: number): Promise<User[]> {
    if (id) {
      return [await this.userService.getUserById(id)];
    }
    return this.userService.getAllUsers();
  }
  @Get('exists')
    async isThereId(@Query('id') id: number): Promise<boolean>{
      const user = await this.userService.getUserById(id);
      return !!user;
    }
  
  @Get('toprankings')
    async getTopRenkings(): Promise<User[]>{
      return this.userService.getTopRankings(10);
    }

  @Put('scoreup')
    async userScoreUp(@Query('id') id: number, @Body() body: {delta: number}): Promise<User>{
      const {delta} =body;
      return this.userService.userScoreUp(id, delta);
    }

  @Put('nickname')
    async updateUser(@Query('id') id: number, @Body() body:{nickname: string}) : Promise<User>{
      const {nickname}= body;
      return this.userService.updateUser(id, nickname);
    }

  @Delete()
  async removeUser(@Query('id') id: number): Promise<User>{
    return this.userService.removeUser(id);
  }

  @Post('uploadProfileImage')
  @UseInterceptors(FileInterceptor('image'))
  async uploadProfileImage(@Body('id')id: number, @UploadedFile() file: Express.Multer.File){
    return this.userService.uploadProfileImage(id, file);
  }
}