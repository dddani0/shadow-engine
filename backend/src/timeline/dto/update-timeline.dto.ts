export class UpdateTimelineDto {
  id?: string;
  actions?: {
    type?: string;
    spriteId?: string;
  }[];
}
