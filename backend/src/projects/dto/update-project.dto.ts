import { Scene } from '@prisma/client';

export class UpdateProjectDto {
  title?: string;
  description?: string;
  scenes?: Scene[];
}
