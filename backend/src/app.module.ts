import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectsModule } from './projects/projects.module';
import { ScenesModule } from './scenes/scenes.module';
import { ChoicesModule } from './choices/choices.module';
import { PlaybackModule } from './playback/playback.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    ProjectsModule,
    ScenesModule,
    ChoicesModule,
    PlaybackModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
