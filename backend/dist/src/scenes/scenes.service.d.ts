import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSceneDto } from './dto/create-scene.dto';
import { UpdateSceneDto } from './dto/update-scene.dto';
export declare class ScenesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateSceneDto): Prisma.Prisma__SceneClient<{
        id: string;
        title: string | null;
        orderIndex: number;
        metadata: Prisma.JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    findByScene(sceneId: string): Prisma.Prisma__SceneClient<{
        id: string;
        title: string | null;
        orderIndex: number;
        metadata: Prisma.JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    findByProject(projectId: string): Prisma.PrismaPromise<{
        id: string;
        title: string | null;
        orderIndex: number;
        metadata: Prisma.JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
    }[]>;
    findOne(id: string): Prisma.Prisma__SceneClient<{
        choicesFrom: {
            id: string;
            orderIndex: number;
            fromSceneId: string;
            toSceneId: string;
            label: string;
        }[];
    } & {
        id: string;
        title: string | null;
        orderIndex: number;
        metadata: Prisma.JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    update(id: string, dto: UpdateSceneDto): Prisma.Prisma__SceneClient<{
        id: string;
        title: string | null;
        orderIndex: number;
        metadata: Prisma.JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    remove(id: string): Prisma.Prisma__SceneClient<{
        id: string;
        title: string | null;
        orderIndex: number;
        metadata: Prisma.JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
}
