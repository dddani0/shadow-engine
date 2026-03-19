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
        createdAt: Date;
        updatedAt: Date;
        orderIndex: number;
        content: string;
        metadata: Prisma.JsonValue | null;
        projectId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    findByProject(projectId: string): Prisma.PrismaPromise<{
        id: string;
        title: string | null;
        createdAt: Date;
        updatedAt: Date;
        orderIndex: number;
        content: string;
        metadata: Prisma.JsonValue | null;
        projectId: string;
    }[]>;
    findOne(id: string): Prisma.Prisma__SceneClient<{
        choicesFrom: {
            id: string;
            orderIndex: number;
            label: string;
            fromSceneId: string;
            toSceneId: string;
        }[];
    } & {
        id: string;
        title: string | null;
        createdAt: Date;
        updatedAt: Date;
        orderIndex: number;
        content: string;
        metadata: Prisma.JsonValue | null;
        projectId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    update(id: string, dto: UpdateSceneDto): Prisma.Prisma__SceneClient<{
        id: string;
        title: string | null;
        createdAt: Date;
        updatedAt: Date;
        orderIndex: number;
        content: string;
        metadata: Prisma.JsonValue | null;
        projectId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    remove(id: string): Prisma.Prisma__SceneClient<{
        id: string;
        title: string | null;
        createdAt: Date;
        updatedAt: Date;
        orderIndex: number;
        content: string;
        metadata: Prisma.JsonValue | null;
        projectId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
}
