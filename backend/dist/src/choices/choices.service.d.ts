import { PrismaService } from '../prisma/prisma.service';
import { CreateChoiceDto } from './dto/create-choice.dto';
import { UpdateChoiceDto } from './dto/update-choice.dto';
export declare class ChoicesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateChoiceDto): import("@prisma/client").Prisma.Prisma__ChoiceClient<{
        id: string;
        orderIndex: number;
        label: string;
        fromSceneId: string;
        toSceneId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findByScene(sceneId: string): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        orderIndex: number;
        label: string;
        fromSceneId: string;
        toSceneId: string;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__ChoiceClient<{
        fromScene: {
            id: string;
            title: string | null;
            createdAt: Date;
            updatedAt: Date;
            orderIndex: number;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            projectId: string;
        };
        toScene: {
            id: string;
            title: string | null;
            createdAt: Date;
            updatedAt: Date;
            orderIndex: number;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            projectId: string;
        };
    } & {
        id: string;
        orderIndex: number;
        label: string;
        fromSceneId: string;
        toSceneId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, dto: UpdateChoiceDto): import("@prisma/client").Prisma.Prisma__ChoiceClient<{
        id: string;
        orderIndex: number;
        label: string;
        fromSceneId: string;
        toSceneId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__ChoiceClient<{
        id: string;
        orderIndex: number;
        label: string;
        fromSceneId: string;
        toSceneId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
