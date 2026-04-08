import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SpriteService } from './sprite.service';
import { CreateSpriteDto } from './dto/create-sprite.dto';
import { UpdateSpriteDto } from './dto/update-sprite.dto';

@Controller('sprite')
export class SpriteController {
  constructor(private readonly spriteService: SpriteService) {}

  @Post()
  create(@Body() createSpriteDto: CreateSpriteDto) {
    return this.spriteService.create(createSpriteDto);
  }

  @Get()
  findAll() {
    return this.spriteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.spriteService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpriteDto: UpdateSpriteDto) {
    return this.spriteService.update(id, updateSpriteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.spriteService.remove(id);
  }
}
