import { ScenesService } from './scenes.service';
import { CreateSceneDto } from './dto/create-scene.dto';
import { UpdateSceneDto } from './dto/update-scene.dto';
export declare class ScenesController {
    private readonly scenesService;
    constructor(scenesService: ScenesService);
    create(dto: CreateSceneDto): import("@prisma/client").Prisma.Prisma__SceneClient<{
        id: string;
        projectId: string;
        title: string | null;
        orderIndex: number;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findByProject(projectId: string): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        projectId: string;
        title: string | null;
        orderIndex: number;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__SceneClient<{
        choicesFrom: {
            id: string;
            orderIndex: number;
            label: string;
            fromSceneId: string;
            toSceneId: string;
        }[];
    } & {
        id: string;
        projectId: string;
        title: string | null;
        orderIndex: number;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, dto: UpdateSceneDto): import("@prisma/client").Prisma.Prisma__SceneClient<{
        id: string;
        projectId: string;
        title: string | null;
        orderIndex: number;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__SceneClient<{
        id: string;
        projectId: string;
        title: string | null;
        orderIndex: number;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
