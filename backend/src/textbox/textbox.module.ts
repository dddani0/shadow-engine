import { Module } from '@nestjs/common';
import { TextboxService } from './textbox.service';
import { TextboxController } from './textbox.controller';

@Module({
  controllers: [TextboxController],
  providers: [TextboxService],
  exports: [TextboxService],
})
export class TextboxModule {}
