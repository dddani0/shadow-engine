import { ScenesService } from './scenes.service';
import { CreateSceneDto } from './dto/create-scene.dto';
import { UpdateSceneDto } from './dto/update-scene.dto';
export declare class ScenesController {
    private readonly scenesService;
    constructor(scenesService: ScenesService);
    create(dto: CreateSceneDto): import("@prisma/client").Prisma.Prisma__SceneClient<{
        timeline: {
            id: string;
            sceneId: string;
        } | null;
    } & {
        id: string;
        projectId: string;
        title: string;
        orderIndex: number;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findByProject(projectId: string): import("@prisma/client").Prisma.PrismaPromise<({
        timeline: ({
            actions: {
                id: string;
                type: string;
                timelineId: string;
                componentId: string | null;
                loadSceneId: string | null;
            }[];
        } & {
            id: string;
            sceneId: string;
        }) | null;
    } & {
        id: string;
        projectId: string;
        title: string;
        orderIndex: number;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__SceneClient<{
        timeline: ({
            actions: {
                id: string;
                type: string;
                timelineId: string;
                componentId: string | null;
                loadSceneId: string | null;
            }[];
        } & {
            id: string;
            sceneId: string;
        }) | null;
    } & {
        id: string;
        projectId: string;
        title: string;
        orderIndex: number;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, dto: UpdateSceneDto): import("@prisma/client").Prisma.Prisma__SceneClient<{
        id: string;
        projectId: string;
        title: string;
        orderIndex: number;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__SceneClient<{
        id: string;
        projectId: string;
        title: string;
        orderIndex: number;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
