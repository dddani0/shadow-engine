import { SpriteService } from './sprite.service';
import { CreateSpriteDto } from './dto/create-sprite.dto';
import { UpdateSpriteDto } from './dto/update-sprite.dto';
export declare class SpriteController {
    private readonly spriteService;
    constructor(spriteService: SpriteService);
    create(createSpriteDto: CreateSpriteDto): import("@prisma/client").Prisma.Prisma__SpriteClient<{
        path: string;
        id: string;
        componentId: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        component: {
            id: string;
            title: string;
            sceneId: string;
        } | null;
    } & {
        path: string;
        id: string;
        componentId: string | null;
    })[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__SpriteClient<({
        component: {
            id: string;
            title: string;
            sceneId: string;
        } | null;
    } & {
        path: string;
        id: string;
        componentId: string | null;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateSpriteDto: UpdateSpriteDto): import("@prisma/client").Prisma.Prisma__SpriteClient<{
        path: string;
        id: string;
        componentId: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__SpriteClient<{
        path: string;
        id: string;
        componentId: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
