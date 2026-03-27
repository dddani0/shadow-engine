export class CreateTimelineDto {
  id?: string;
  actions?: {
    type: string;
    spriteId?: string;
  }[];
}
