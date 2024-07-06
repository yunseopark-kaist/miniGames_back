// src/user/user.controller.ts
import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../schemas/user.schema';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body('id') id: number, @Body('nickname') nickname: string): Promise<User> {
    return this.userService.createUser(id, nickname);
  }

  @Get()
  async getUsers(@Query('id') id: number): Promise<User[]> {
    if (id) {
      return [await this.userService.getUserById(id)];
    }
    return this.userService.getAllUsers();
  }
}