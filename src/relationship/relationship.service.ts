// src/relationship/relationship.service
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Relationship } from '../schemas/relationship.schema';

@Injectable()
export class RelationshipService {
  constructor(@InjectModel(Relationship.name, 'userdbConnection') private relationshipModel: Model<Relationship>) {}

  async createRequest(requesterId: number, recipientId: number): Promise<Relationship> {
    return new this.relationshipModel({ requesterId, recipientId }).save();
  }

  async getFriends(userId: number): Promise<number[]> {
    const friends = await this.relationshipModel.find({
      $or: [{ requesterId: userId }, { recipientId: userId }],
      isAccepted: true,
    }).exec();
    return friends.map(friend => friend.requesterId == userId ? friend.recipientId : friend.requesterId);
  }

  async getSentRequests(userId: number): Promise<number[]> {
    const requests = await this.relationshipModel.find({ requesterId: userId, isAccepted: false });
    return requests.map(request => request.recipientId);
  }

  async getReceivedRequests(userId: number): Promise<number[]> {
    const requests = await this.relationshipModel.find({ recipientId: userId, isAccepted: false });
    return requests.map(request => request.requesterId);
  }

  async acceptRequest(requesterId: number, recipientId: number): Promise<void> {
    await this.relationshipModel.updateOne({ requesterId, recipientId }, { isAccepted: true });
    await this.relationshipModel.deleteOne({ requesterId: recipientId, recipientId: requesterId, isAccepted: false });
  }

  async rejectRequest(requesterId: number, recipientId: number): Promise<void> {
    await this.relationshipModel.deleteOne({ requesterId, recipientId, isAccepted: false });
  }

  async removeFriend(userId: number, friendId: number): Promise<void> {
    await this.relationshipModel.deleteOne({
      $or: [
        { requesterId: userId, recipientId: friendId, isAccepted: true },
        { requesterId: friendId, recipientId: userId, isAccepted: true }
      ]
    });
  }

  async areFriends(id1: number, id2: number): Promise<boolean> {
    const friendship = await this.relationshipModel.findOne({
      $or: [
        { requesterId: id1, recipientId: id2, isAccepted: true },
        { requesterId: id2, recipientId: id1, isAccepted: true }
      ]
    });
    return !!friendship;
  }

  async hasSentRequest(id1: number, id2: number): Promise<boolean> {
    const request = await this.relationshipModel.findOne({
      requesterId: id1,
      recipientId: id2,
      isAccepted: false
    });
    return !!request;
  }

}