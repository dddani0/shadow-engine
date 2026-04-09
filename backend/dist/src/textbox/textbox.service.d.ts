import { PrismaService } from '../prisma/prisma.service';
import { CreateTextboxDto } from './dto/create-textbox.dto';
import { UpdateTextboxDto } from './dto/update-textbox.dto';
export declare class TextboxService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateTextboxDto): Promise<{
        component: {
            id: string;
            title: string;
            sceneId: string;
        };
    } & {
        id: string;
        title: string | null;
        componentId: string;
        content: string[];
        charPerSecond: number;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        component: {
            id: string;
            title: string;
            sceneId: string;
        };
    } & {
        id: string;
        title: string | null;
        componentId: string;
        content: string[];
        charPerSecond: number;
    })[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__TextboxClient<({
        component: {
            id: string;
            title: string;
            sceneId: string;
        };
    } & {
        id: string;
        title: string | null;
        componentId: string;
        content: string[];
        charPerSecond: number;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, dto: UpdateTextboxDto): Promise<{
        component: {
            id: string;
            title: string;
            sceneId: string;
        };
    } & {
        id: string;
        title: string | null;
        componentId: string;
        content: string[];
        charPerSecond: number;
    }>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__TextboxClient<{
        id: string;
        title: string | null;
        componentId: string;
        content: string[];
        charPerSecond: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findByComponent(componentId: string): import("@prisma/client").Prisma.Prisma__TextboxClient<({
        component: {
            id: string;
            title: string;
            sceneId: string;
        };
    } & {
        id: string;
        title: string | null;
        componentId: string;
        content: string[];
        charPerSecond: number;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
