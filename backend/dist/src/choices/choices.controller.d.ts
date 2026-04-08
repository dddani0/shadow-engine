import { ChoicesService } from './choices.service';
import { CreateChoiceDto } from './dto/create-choice.dto';
import { UpdateChoiceDto } from './dto/update-choice.dto';
export declare class ChoicesController {
    private readonly choicesService;
    constructor(choicesService: ChoicesService);
    create(dto: CreateChoiceDto): import("@prisma/client").Prisma.Prisma__ChoiceClient<{
        id: string;
        orderIndex: number;
        fromSceneId: string;
        toSceneId: string;
        label: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findByScene(sceneId: string): import("@prisma/client").Prisma.PrismaPromise<({
        toScene: {
            id: string;
            title: string | null;
        };
    } & {
        id: string;
        orderIndex: number;
        fromSceneId: string;
        toSceneId: string;
        label: string;
    })[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__ChoiceClient<{
        fromScene: {
            id: string;
            projectId: string;
            title: string | null;
            orderIndex: number;
            metadata: import("@prisma/client/runtime/client").JsonValue | null;
            createdAt: Date;
            updatedAt: Date;
        };
        toScene: {
            id: string;
            projectId: string;
            title: string | null;
            orderIndex: number;
            metadata: import("@prisma/client/runtime/client").JsonValue | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        orderIndex: number;
        fromSceneId: string;
        toSceneId: string;
        label: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, dto: UpdateChoiceDto): import("@prisma/client").Prisma.Prisma__ChoiceClient<{
        id: string;
        orderIndex: number;
        fromSceneId: string;
        toSceneId: string;
        label: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__ChoiceClient<{
        id: string;
        orderIndex: number;
        fromSceneId: string;
        toSceneId: string;
        label: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
