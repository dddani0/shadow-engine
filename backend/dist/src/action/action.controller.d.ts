import { ActionService } from './action.service';
import { CreateActionDto } from './dto/create-action.dto';
import { UpdateActionDto } from './dto/update-action.dto';
export declare class ActionController {
    private readonly actionService;
    constructor(actionService: ActionService);
    create(dto: CreateActionDto): import("@prisma/client").Prisma.Prisma__ActionClient<{
        id: string;
        componentId: string | null;
        type: string;
        timelineId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        timeline: {
            id: string;
            sceneId: string;
        };
    } & {
        id: string;
        componentId: string | null;
        type: string;
        timelineId: string;
    })[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__ActionClient<{
        timeline: {
            id: string;
            sceneId: string;
        };
    } & {
        id: string;
        componentId: string | null;
        type: string;
        timelineId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, dto: UpdateActionDto): import("@prisma/client").Prisma.Prisma__ActionClient<{
        id: string;
        componentId: string | null;
        type: string;
        timelineId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__ActionClient<{
        id: string;
        componentId: string | null;
        type: string;
        timelineId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
