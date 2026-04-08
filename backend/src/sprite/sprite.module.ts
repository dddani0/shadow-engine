import { Module } from '@nestjs/common';
import { SpriteService } from './sprite.service';
import { SpriteController } from './sprite.controller';

@Module({
  controllers: [SpriteController],
  providers: [SpriteService],
  exports: [SpriteService],
})
export class SpriteModule {}
