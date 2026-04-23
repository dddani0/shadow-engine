import { ChoiceMenuService } from './choiceMenu.service';
import { CreateChoiceMenuDto } from './dto/create-choicemenu.dto';
import { UpdateChoiceMenuDto } from './dto/update-choicemenu.dto';
export declare class ChoiceMenuController {
    private readonly choicesService;
    constructor(choicesService: ChoiceMenuService);
    create(dto: CreateChoiceMenuDto): import("@prisma/client").Prisma.Prisma__ChoiceMenuClient<{
        id: string;
        title: string | null;
        description: string | null;
        componentId: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findByScene(actionId: string): import("@prisma/client").Prisma.PrismaPromise<({} & {
        id: string;
        title: string | null;
        description: string | null;
        componentId: string | null;
    })[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__ChoiceMenuClient<{
        choices: {
            id: string;
            orderIndex: number;
            label: string;
            actionId: string;
            choiceMenuId: string | null;
        }[];
    } & {
        id: string;
        title: string | null;
        description: string | null;
        componentId: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, dto: UpdateChoiceMenuDto): import("@prisma/client").Prisma.Prisma__ChoiceMenuClient<{
        id: string;
        title: string | null;
        description: string | null;
        componentId: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__ChoiceMenuClient<{
        id: string;
        title: string | null;
        description: string | null;
        componentId: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
