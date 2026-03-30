import { CreateComponentDto } from './dto/create-component.dto';
import { ComponentService } from './component.service';
import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { UpdateComponentDto } from './dto/update-component.dto';

@Controller('components')
export class ComponentController {
  constructor(private readonly componentService: ComponentService) {}

  @Post()
  create(@Body() dto: CreateComponentDto) {
    return this.componentService.create(dto);
  }

  @Get()
  findAll() {
    return this.componentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.componentService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateComponentDto: UpdateComponentDto,
  ) {
    return this.componentService.update(id, updateComponentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.componentService.remove(id);
  }
}
