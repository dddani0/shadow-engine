import { Variable } from '@prisma/client';

export class UpdateActionDto {
  timelineId?: string;
  type?: string;
  componentId?: string;
  variables?: Variable[];
  loadSceneId?: string;
}
