import { Choice } from '@prisma/client';

export class CreateChoiceMenuDto {
  title?: string;
  description?: string;
  componentId?: string;
  choices?: Choice[];
}
