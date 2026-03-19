export class CreateSceneDto {
  projectId: string;
  title?: string;
  content: string;
  orderIndex?: number;
  metadata?: Record<string, unknown>;
}
