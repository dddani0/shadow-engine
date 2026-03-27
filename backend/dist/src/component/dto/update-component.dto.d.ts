export declare class UpdateComponentDto {
    id?: string;
    title: string;
    sprite?: {
        path?: string;
    };
    textbox?: {
        title?: string;
        content?: string[];
        charPerSecond?: number;
    };
    choiceMenu?: {
        title?: string;
    };
}
