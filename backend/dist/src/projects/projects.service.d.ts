import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateProjectDto): import("@prisma/client").Prisma.Prisma__ProjectClient<{
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        startSceneId: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        startSceneId: string | null;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__ProjectClient<{
        scenes: ({
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
        })[];
    } & {
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        startSceneId: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, dto: UpdateProjectDto): import("@prisma/client").Prisma.Prisma__ProjectClient<{
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        startSceneId: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__ProjectClient<{
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        startSceneId: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
