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
import { ChoiceMenuService } from './choiceMenu.service';
import { CreateChoiceMenuDto } from './dto/create-choicemenu.dto';
import { UpdateChoiceMenuDto } from './dto/update-choicemenu.dto';

@Controller('choiceMenu')
export class ChoiceMenuController {
  constructor(private readonly choicesService: ChoiceMenuService) {}

  @Post()
  create(@Body() dto: CreateChoiceMenuDto) {
    return this.choicesService.create(dto);
  }

  @Get()
  findByScene(@Query('actionId') actionId: string) {
    return this.choicesService.findByComponent(actionId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.choicesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateChoiceMenuDto) {
    return this.choicesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.choicesService.remove(id);
  }
}
