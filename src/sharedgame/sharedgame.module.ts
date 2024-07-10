import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedGameService } from './sharedgame.service';
import { SharedGameController } from './sharedgame.controller';
import { SharedGame, SharedGameSchema } from '../schemas/sharedgame.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: SharedGame.name, schema: SharedGameSchema }], 'gamedbConnection')],
  providers: [SharedGameService],
  controllers: [SharedGameController],
})
export class SharedGameModule {}
