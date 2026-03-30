export class UpdateActionDto {
  id?: string;
  actions?: {
    type?: string;
    spriteId?: string;
  }[];
}
