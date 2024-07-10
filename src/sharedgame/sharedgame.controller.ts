import { Controller, Post, Body } from '@nestjs/common';
import { SharedGameService } from './sharedgame.service';
import { SharedGameDto } from './dto/save-sharedgame.dto';

@Controller('shared-games')
export class SharedGameController {
  constructor(private readonly sharedGameService: SharedGameService) {}

  @Post()
  async shareGame(@Body() sharedGameDto: SharedGameDto) {
    return this.sharedGameService.shareGame(sharedGameDto);
  }

  // 필요에 따라 다른 엔드포인트 추가 가능
}