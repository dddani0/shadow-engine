import { Sprite } from '@prisma/client';

export class CreateComponentDto {
  title: string;
  sceneId: string;
  //Sprite
  sprite?: Sprite;
  //Textbox
  textbox?: {
    title?: string;
    content: string[];
    charPerSecond: number;
  };
  //Choice menu
  choiceMenu?: {
    title?: string;
  };
}
