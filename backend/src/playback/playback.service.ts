import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlaybackService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Returns the scene payload for playback: dialogue, metadata, and choices.
   * If sceneId is omitted, returns the first scene (by orderIndex) of the project.
   */
  async getScene(projectId: string, sceneId?: string) {
    if (sceneId) {
      const scene = await this.prisma.scene.findFirstOrThrow({
        where: { id: sceneId, projectId },
        include: {
          choicesFrom: {
            orderBy: { orderIndex: 'asc' },
            select: { id: true, label: true, toSceneId: true },
          },
        },
      });
      return {
        scene: {
          id: scene.id,
          title: scene.title,
          metadata: scene.metadata,
          orderIndex: scene.orderIndex,
        },
        choices: scene.choicesFrom,
      };
    }

    const firstScene = await this.prisma.scene.findFirst({
      where: { projectId },
      orderBy: { orderIndex: 'asc' },
      include: {
        choicesFrom: {
          orderBy: { orderIndex: 'asc' },
          select: { id: true, label: true, toSceneId: true },
        },
      },
    });

    if (!firstScene) {
      return { scene: null, choices: [] };
    }

    return {
      scene: {
        id: firstScene.id,
        title: firstScene.title,
        metadata: firstScene.metadata,
        orderIndex: firstScene.orderIndex,
      },
      choices: firstScene.choicesFrom,
    };
  }
}
