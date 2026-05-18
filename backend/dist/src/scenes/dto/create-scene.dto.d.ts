import { Component } from '@prisma/client';
export declare class CreateSceneDto {
    projectId: string;
    title: string;
    orderIndex?: number;
    metadata?: Record<string, unknown>;
    objectComponentGroups?: Component[];
}
