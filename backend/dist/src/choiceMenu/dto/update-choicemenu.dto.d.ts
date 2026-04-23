import { Choice } from '@prisma/client';
export declare class UpdateChoiceMenuDto {
    title?: string;
    description?: string;
    componentId?: string;
    choices?: Choice[];
}
