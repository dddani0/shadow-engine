import { ChoiceMenu, Sprite, Textbox } from '@prisma/client';

export class CreateComponentDto {
  title: string;
  sceneId: string;
  //Sprite
  sprite?: Sprite;
  //Textbox
  textbox?: Textbox;
  //Choice menu
  choiceMenu?: ChoiceMenu;
}
