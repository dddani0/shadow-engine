import { Controller, Get, Param, Query } from '@nestjs/common';
import { PlaybackService } from './playback.service';

@Controller('playback')
export class PlaybackController {
  constructor(private readonly playbackService: PlaybackService) {}

  /**
   * GET /playback/:projectId?sceneId=xxx
   * Returns current scene and available choices. Omit sceneId for start.
   */
  @Get(':projectId')
  getScene(
    @Param('projectId') projectId: string,
    @Query('sceneId') sceneId?: string,
  ) {
    return this.playbackService.getScene(projectId, sceneId);
  }
}
