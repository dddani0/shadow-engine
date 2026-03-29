import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTimelineDto } from './dto/create-timeline.dto';
import { UpdateTimelineDto } from './dto/update-timeline.dto';
export declare class TimelineService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateTimelineDto): import("@prisma/client").Prisma.Prisma__TimelineClient<{
        id: string;
        sceneId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        sceneId: string;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__TimelineClient<{
        actions: {
            id: string;
            type: string;
            spriteId: string;
            timelineId: string;
        }[];
    } & {
        id: string;
        sceneId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, dto: UpdateTimelineDto): import("@prisma/client").Prisma.Prisma__TimelineClient<{
        id: string;
        sceneId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__TimelineClient<{
        id: string;
        sceneId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
