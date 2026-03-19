import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ScenesService } from './scenes.service';
import { CreateSceneDto } from './dto/create-scene.dto';
import { UpdateSceneDto } from './dto/update-scene.dto';

@Controller('scenes')
export class ScenesController {
  constructor(private readonly scenesService: ScenesService) {}

  @Post()
  create(@Body() dto: CreateSceneDto) {
    return this.scenesService.create(dto);
  }

  @Get()
  findByProject(@Query('projectId') projectId: string) {
    return this.scenesService.findByProject(projectId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scenesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSceneDto) {
    return this.scenesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scenesService.remove(id);
  }
}
