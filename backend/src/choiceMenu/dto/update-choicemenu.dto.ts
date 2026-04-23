import { Choice } from '@prisma/client';

export class UpdateChoiceMenuDto {
  title?: string;
  description?: string;
  componentId?: string;
  choices?: Choice[];
}
