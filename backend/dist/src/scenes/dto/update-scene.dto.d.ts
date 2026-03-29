import { Component } from '@prisma/client';
export declare class UpdateSceneDto {
    title?: string;
    orderIndex?: number;
    metadata?: Record<string, unknown>;
    component?: Component;
    timeline?: {
        id?: string;
        actions?: {
            type: string;
            spriteId: string;
        }[];
    };
}
