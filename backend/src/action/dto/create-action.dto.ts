import { Variable } from '@prisma/client';

export class CreateActionDto {
  timelineId: string;
  type: string;
  componentId: string;
  variables: Variable[];
  loadSceneId?: string;
}
