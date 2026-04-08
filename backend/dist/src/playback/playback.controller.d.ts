import { PlaybackService } from './playback.service';
export declare class PlaybackController {
    private readonly playbackService;
    constructor(playbackService: PlaybackService);
    getScene(projectId: string, sceneId?: string): Promise<{
        scene: {
            id: string;
            title: string | null;
            metadata: import("@prisma/client/runtime/client").JsonValue;
            orderIndex: number;
        };
        choices: {
            id: string;
            toSceneId: string;
            label: string;
        }[];
    } | {
        scene: null;
        choices: never[];
    }>;
}
