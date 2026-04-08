import { Scene } from '@prisma/client';

export class CreateProjectDto {
  title: string;
  description?: string;
  scenes: Scene[];
  startSceneId: string;
}
