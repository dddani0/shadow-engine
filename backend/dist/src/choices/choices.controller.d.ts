import { ChoicesService } from './choices.service';
import { CreateChoiceDto } from './dto/create-choice.dto';
import { UpdateChoiceDto } from './dto/update-choice.dto';
export declare class ChoicesController {
    private readonly choicesService;
    constructor(choicesService: ChoicesService);
    create(dto: CreateChoiceDto): import("@prisma/client").Prisma.Prisma__ChoiceClient<{
        id: string;
        orderIndex: number;
        label: string;
        actionId: string;
        choiceMenuId: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findByScene(actionId: string): import("@prisma/client").Prisma.PrismaPromise<({} & {
        id: string;
        orderIndex: number;
        label: string;
        actionId: string;
        choiceMenuId: string | null;
    })[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__ChoiceClient<{} & {
        id: string;
        orderIndex: number;
        label: string;
        actionId: string;
        choiceMenuId: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, dto: UpdateChoiceDto): import("@prisma/client").Prisma.Prisma__ChoiceClient<{
        id: string;
        orderIndex: number;
        label: string;
        actionId: string;
        choiceMenuId: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__ChoiceClient<{
        id: string;
        orderIndex: number;
        label: string;
        actionId: string;
        choiceMenuId: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
