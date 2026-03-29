import { CreateComponentDto } from './dto/create-component.dto';
import { ComponentService } from './component.service';
import { UpdateComponentDto } from './dto/update-component.dto';
export declare class ComponentController {
    private readonly componentService;
    constructor(componentService: ComponentService);
    create(dto: CreateComponentDto): import("@prisma/client").Prisma.Prisma__ComponentClient<{
        id: string;
        title: string;
        sceneId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        scene: {
            id: string;
            projectId: string;
            title: string | null;
            orderIndex: number;
            metadata: import("@prisma/client/runtime/client").JsonValue | null;
            createdAt: Date;
            updatedAt: Date;
        };
        sprite: {
            path: string;
            id: string;
            componentId: string;
        } | null;
        textBox: {
            id: string;
            title: string | null;
            componentId: string;
            content: string[];
            charPerSecond: number;
        } | null;
    } & {
        id: string;
        title: string;
        sceneId: string;
    })[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__ComponentClient<({
        scene: {
            id: string;
            projectId: string;
            title: string | null;
            orderIndex: number;
            metadata: import("@prisma/client/runtime/client").JsonValue | null;
            createdAt: Date;
            updatedAt: Date;
        };
        sprite: {
            path: string;
            id: string;
            componentId: string;
        } | null;
        textBox: {
            id: string;
            title: string | null;
            componentId: string;
            content: string[];
            charPerSecond: number;
        } | null;
    } & {
        id: string;
        title: string;
        sceneId: string;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateComponentDto: UpdateComponentDto): import("@prisma/client").Prisma.Prisma__ComponentClient<{
        scene: {
            id: string;
            projectId: string;
            title: string | null;
            orderIndex: number;
            metadata: import("@prisma/client/runtime/client").JsonValue | null;
            createdAt: Date;
            updatedAt: Date;
        };
        sprite: {
            path: string;
            id: string;
            componentId: string;
        } | null;
        textBox: {
            id: string;
            title: string | null;
            componentId: string;
            content: string[];
            charPerSecond: number;
        } | null;
    } & {
        id: string;
        title: string;
        sceneId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__ComponentClient<{
        id: string;
        title: string;
        sceneId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
