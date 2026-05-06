import { ChoiceMenu, Sprite, Textbox } from '@prisma/client';
export declare class CreateComponentDto {
    title: string;
    sceneId: string;
    sprite?: Sprite;
    textbox?: Textbox;
    choiceMenu?: ChoiceMenu;
}
