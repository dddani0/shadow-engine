import { ComponentController } from './component.controller';
import { Module } from '@nestjs/common';
import { ComponentService } from './component.service';

@Module({
  controllers: [ComponentController],
  providers: [ComponentService],
  exports: [ComponentService],
})
export class ComponentModule {}
