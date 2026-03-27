import { PrismaService } from 'src/prisma/prisma.service';
import { CreateComponentDto } from './dto/create-component.dto';
export declare class ComponentService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateComponentDto): void;
}
