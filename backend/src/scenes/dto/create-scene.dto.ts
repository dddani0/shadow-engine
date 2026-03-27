import { Component } from '@prisma/client';
export class CreateSceneDto {
  projectId: string;
  title?: string;
  orderIndex?: number;
  metadata?: Record<string, unknown>;
  objectComponentGroups?: Component[];
  timeline?: {
    id?: string;
    actions?: {
      type: string;
      spriteId: string;
    }[];
  };
}
