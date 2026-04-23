import { PrismaService } from '../prisma/prisma.service';
import { CreateChoiceDto } from './dto/create-choice.dto';
import { UpdateChoiceDto } from './dto/update-choice.dto';
export declare class ChoicesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateChoiceDto): import("@prisma/client").Prisma.Prisma__ChoiceClient<{
        id: string;
        orderIndex: number;
        label: string;
        actionId: string;
        choiceMenuId: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findByAction(actionId: string): import("@prisma/client").Prisma.PrismaPromise<({} & {
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
