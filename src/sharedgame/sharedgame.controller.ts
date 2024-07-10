import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { SharedGameService } from './sharedgame.service';
import { SharedGameDto } from './dto/save-sharedgame.dto';

@Controller('shared-games')
export class SharedGameController {
  constructor(private readonly sharedGameService: SharedGameService) {}

  @Post()
  async shareGame(@Body() sharedGameDto: SharedGameDto) {
    return this.sharedGameService.shareGame(sharedGameDto);
  }

  @Get(':userId')
    async getSharedGames(
        @Param('userId') userId: string
    ): Promise<SharedGameDto[]> {
        const sharedGames = await this.sharedGameService.getSharedGames(userId);

        // SharedGameDto 형식으로 변환하여 반환
        return sharedGames.map(game => ({
            userId: game.userId,
            shareduserId: game.shareduserId,
            name: game.name,
            gameState: game.gameState
        }));
    }

  // 필요에 따라 다른 엔드포인트 추가 가능
}