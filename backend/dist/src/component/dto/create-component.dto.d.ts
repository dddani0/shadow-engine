export declare class CreateComponentDto {
    id?: string;
    title: string;
    sceneId: string;
    sprite?: {
        path: string;
    };
    textbox?: {
        title?: string;
        content: string[];
        charPerSecond: number;
    };
    choiceMenu?: {
        title?: string;
    };
}
