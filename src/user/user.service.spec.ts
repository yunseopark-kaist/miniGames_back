// src/user/user.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';

const mockUser = {
  _id: 'someId',
  name: 'John Doe',
  email: 'john@example.com',
};

const mockUserModel = {
  find: jest.fn().mockResolvedValue([mockUser]),
  findByIdAndDelete: jest.fn().mockResolvedValue(mockUser),
};

describe('UserService', () => {
  let service: UserService;
  let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    model = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of users', async () => {
    const users = await service.findAll();
    expect(users).toEqual([mockUser]);
    expect(model.find).toHaveBeenCalled();
  });

  it('should delete a user by id', async () => {
    const deletedUser = await service.remove('someId');
    expect(deletedUser).toEqual(mockUser);
    expect(model.findByIdAndDelete).toHaveBeenCalledWith('someId');
  });
});