import { Variable } from '@prisma/client';
export declare class CreateActionDto {
    timelineId: string;
    type: string;
    componentId: string;
    variables: Variable[];
    loadSceneId?: string;
}
