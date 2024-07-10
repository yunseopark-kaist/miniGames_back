// src/user/user.controller.ts
//엔드포인트를 정의

import { Controller, Get, Post, Put, Delete, Body, Param,Query } from '@nestjs/common';
import { RelationshipService } from './relationship.service';

@Controller('relationships')
export class RelationshipController {
  constructor(private readonly relationshipService: RelationshipService) {}

  @Post()
  async createRequest(@Body('requesterId') requesterId: number, @Body('recipientId') recipientId: number) {
    return this.relationshipService.createRequest(requesterId, recipientId);
  }

  @Get('friends/:userId')
  async getFriends(@Param('userId') userId: number) {
    return this.relationshipService.getFriends(userId);
  }

  @Get('sent-requests/:userId')
  async getSentRequests(@Param('userId') userId: number) {
    return this.relationshipService.getSentRequests(userId);
  }

  @Get('received-requests/:userId')
  async getReceivedRequests(@Param('userId') userId: number) {
    return this.relationshipService.getReceivedRequests(userId);
  }


  @Get('are-friends')
  async areFriends(@Query('id1') id1: number, @Query('id2') id2: number) {
    return this.relationshipService.areFriends(id1, id2);
  }

  @Get('has-sent-request')
  async hasSentRequest(@Query('id1') id1: number, @Query('id2') id2: number) {
    return this.relationshipService.hasSentRequest(id1, id2);
  }

  @Put('reject')
  async rejectRequest(@Body('requesterId') requesterId: number, @Body('recipientId') recipientId: number) {
    return this.relationshipService.rejectRequest(requesterId, recipientId);
  }

  @Put('accept')
  async acceptRequest(@Body('requesterId') requesterId: number, @Body('recipientId') recipientId: number) {
    return this.relationshipService.acceptRequest(requesterId, recipientId);
  }

  @Delete('remove')
  async removeFriend(@Body('requesterId') userId: number, @Body('recipientId') friendId: number)  {
    return this.relationshipService.removeFriend(userId, friendId);
  }
}