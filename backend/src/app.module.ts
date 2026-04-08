import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectsModule } from './projects/projects.module';
import { ScenesModule } from './scenes/scenes.module';
import { ChoicesModule } from './choices/choices.module';
import { PlaybackModule } from './playback/playback.module';
import { ComponentModule } from './component/component.module';
import { TimelineModule } from './timeline/timeline.module';
import { ActionModule } from './action/action.module';
import { SpriteModule } from './sprite/sprite.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    ProjectsModule,
    ScenesModule,
    ChoicesModule,
    PlaybackModule,
    ComponentModule,
    TimelineModule,
    ActionModule,
    SpriteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
