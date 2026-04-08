import { Sprite } from '@prisma/client';
export declare class CreateComponentDto {
    title: string;
    sceneId: string;
    sprite?: Sprite;
    textbox?: {
        title?: string;
        content: string[];
        charPerSecond: number;
    };
    choiceMenu?: {
        title?: string;
    };
}
