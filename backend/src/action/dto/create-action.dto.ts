export class CreateActionDto {
  id?: string;
  actions?: {
    type: string;
    spriteId?: string;
  }[];
}
