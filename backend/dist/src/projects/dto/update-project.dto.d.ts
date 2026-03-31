import { Scene } from '@prisma/client';
export declare class UpdateProjectDto {
    title?: string;
    description?: string;
    scenes?: Scene[];
    startSceneId?: string;
}
