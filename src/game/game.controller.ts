import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { GameService } from './game.service';
import { SaveGameDto } from './dto/save-game.dto'; // DTO 파일 경로
import { Game } from '../schemas/game.schema'

@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  async saveGame(@Body() saveGameDto: SaveGameDto) {
    return this.gameService.saveGame(saveGameDto);
  }

  @Get()
  async loadGames(@Query('id') id: String): Promise<Game[]> {
    return await this.gameService.loadGamesById(id);
  }
}