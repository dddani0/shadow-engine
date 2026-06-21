import { TimelineService } from './timeline.service';
import { CreateTimelineDto } from './dto/create-timeline.dto';
import { UpdateTimelineDto } from './dto/update-timeline.dto';
export declare class TimelineController {
    private readonly timelineService;
    constructor(timelineService: TimelineService);
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
            timelineId: string;
            componentId: string | null;
            loadSceneId: string | null;
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
