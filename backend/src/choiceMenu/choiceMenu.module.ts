import { Module } from '@nestjs/common';
import { ChoiceMenuService } from './choiceMenu.service';
import { ChoiceMenuController } from './choiceMenu.controller';

@Module({
  controllers: [ChoiceMenuController],
  providers: [ChoiceMenuService],
  exports: [ChoiceMenuService],
})
export class ChoiceMenuModule {}
