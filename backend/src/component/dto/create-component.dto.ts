export class CreateComponentDto {
  id?: string;
  title: string;
  sceneId: string;
  //Sprite
  sprite?: {
    path: string;
  };
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
