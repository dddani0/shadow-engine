import { Choice } from '@prisma/client';
export declare class CreateChoiceMenuDto {
    title?: string;
    description?: string;
    componentId?: string;
    choices?: Choice[];
}
