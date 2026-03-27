import { PrismaService } from '../prisma/prisma.service';
export declare class PlaybackService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getScene(projectId: string, sceneId?: string): Promise<{
        scene: {
            id: string;
            title: string | null;
            metadata: import("@prisma/client/runtime/library").JsonValue;
            orderIndex: number;
        };
        choices: {
            id: string;
            label: string;
            toSceneId: string;
        }[];
    } | {
        scene: null;
        choices: never[];
    }>;
}
