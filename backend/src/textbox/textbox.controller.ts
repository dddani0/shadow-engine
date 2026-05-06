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
import { TextboxService } from './textbox.service';
import { CreateTextboxDto } from './dto/create-textbox.dto';
import { UpdateTextboxDto } from './dto/update-textbox.dto';

@Controller('textbox')
export class TextboxController {
  constructor(private readonly textboxService: TextboxService) {}

  @Post()
  create(@Body() createTextboxDto: CreateTextboxDto) {
    return this.textboxService.create(createTextboxDto);
  }

  @Get()
  findAll() {
    return this.textboxService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.textboxService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTextboxDto: UpdateTextboxDto) {
    return this.textboxService.update(id, updateTextboxDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.textboxService.remove(id);
  }

  @Get('by-component')
  findByComponent(@Query('componentId') componentId: string) {
    return this.textboxService.findByComponent(componentId);
  }
}
