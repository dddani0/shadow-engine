import { Scene } from '@prisma/client';
export declare class CreateProjectDto {
    title: string;
    description?: string;
    scenes: Scene[];
}
