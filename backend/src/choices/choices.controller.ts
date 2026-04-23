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
import { ChoicesService } from './choices.service';
import { CreateChoiceDto } from './dto/create-choice.dto';
import { UpdateChoiceDto } from './dto/update-choice.dto';

@Controller('choices')
export class ChoicesController {
  constructor(private readonly choicesService: ChoicesService) {}

  @Post()
  create(@Body() dto: CreateChoiceDto) {
    return this.choicesService.create(dto);
  }

  @Get()
  findByScene(@Query('actionId') actionId: string) {
    return this.choicesService.findByAction(actionId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.choicesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateChoiceDto) {
    return this.choicesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.choicesService.remove(id);
  }
}
