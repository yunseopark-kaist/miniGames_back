import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GameModule } from './game/game.module';
import { SharedGameModule } from './sharedgame/sharedgame.module';

@Module({
  imports: [
    // 첫 번째 데이터베이스 연결
    MongooseModule.forRoot('mongodb://localhost/userdb', {
      connectionName: 'userdbConnection', // 연결 이름 지정
    }),
    // 두 번째 데이터베이스 연결
    MongooseModule.forRoot('mongodb://localhost/gamedb', {
      connectionName: 'gamedbConnection', // 연결 이름 지정
    }),
    UserModule,
    GameModule,
    SharedGameModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}