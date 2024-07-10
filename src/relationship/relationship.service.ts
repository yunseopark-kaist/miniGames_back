// src/relationship/relationship.service
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Relationship } from '../schemas/relationship.schema';

@Injectable()
export class RelationshipService {
  constructor(@InjectModel(Relationship.name, 'userdbConnection') private relationshipModel: Model<Relationship>) {}

  async createRequest(requesterId: number, recipientId: number): Promise<Relationship> {
    const existingRequest= await this.relationshipModel.findOne({requesterId: requesterId, recipientId: recipientId, isAccepted: false}).exec();
    const existingFriend= await this.relationshipModel.findOne({
      $or: [
        { requesterId: requesterId, recipientId: recipientId, isAccepted: true },
        { requesterId: recipientId, recipientId: requesterId, isAccepted: true }
      ]
    }).exec();
    console.log("existingFriend: ",existingFriend);
    if(!! existingFriend){
      return existingFriend;
    }
    else if(!! existingRequest){
      return existingRequest;
    }
    else{return new this.relationshipModel({ requesterId, recipientId }).save();}
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
    const theOne=await this.relationshipModel.findOne({requesterId:requesterId, recipientId:recipientId}).exec();
    const andOposite= await this.relationshipModel.findOne({requesterId: recipientId, recipientId: requesterId}).exec();
    if (! theOne){
      throw new DOMException('request not found');
    }
    
    else{
      theOne.isAccepted= true;
      await theOne.save();
      if(!! andOposite){
        await this.relationshipModel.deleteOne({requesterId:recipientId, recipientId:requesterId})
      }
    }
  }

  async rejectRequest(requesterId: number, recipientId: number): Promise<void> {
    const theOne= await this.relationshipModel.findOne({requesterId:requesterId, recipientId:recipientId,isAccepted:false})
    if(! theOne){
      throw new DOMException('request not found');
    }
    else{
      await this.relationshipModel.deleteOne({ requesterId, recipientId, isAccepted: false });
    }
  }

  async removeFriend(userId: number, friendId: number): Promise<void> {
    const theOne= await this.relationshipModel.findOne({requesterId:userId, recipientId:friendId,isAccepted:true})
    const theTwo= await this.relationshipModel.findOne({requesterId:friendId, recipientId:userId,isAccepted:true})
    if ((! theOne)&&(! theTwo)){
      throw new DOMException('friends not found');
    }
    else if ((!! theOne) && (! theTwo)){
      await this.relationshipModel.deleteOne({requesterId:userId, recipientId: friendId,isAccepted:true});
    }
    else if((! theOne)&& (!! theTwo)){
      await this.relationshipModel.deleteOne({requesterId:friendId, recipientId:userId,isAccepted:true});
    }
    else{
      throw new DOMException('index conflict occurred');
    }
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