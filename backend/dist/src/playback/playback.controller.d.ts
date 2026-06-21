import { PlaybackService } from './playback.service';
export declare class PlaybackController {
    private readonly playbackService;
    constructor(playbackService: PlaybackService);
    getScene(projectId: string, sceneId?: string): Promise<{
        scene: {
            id: string;
            title: string;
            metadata: import("@prisma/client/runtime/client").JsonValue;
            orderIndex: number;
        };
        choices?: undefined;
    } | {
        scene: null;
        choices: never[];
    }>;
}
