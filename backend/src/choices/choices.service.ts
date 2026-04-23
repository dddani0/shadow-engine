import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChoiceDto } from './dto/create-choice.dto';
import { UpdateChoiceDto } from './dto/update-choice.dto';

@Injectable()
export class ChoicesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateChoiceDto) {
    return this.prisma.choice.create({
      data: {
        actionId: dto.actionId,
        label: dto.label,
        orderIndex: dto.orderIndex ?? 0,
      },
    });
  }

  findByAction(actionId: string) {
    return this.prisma.choice.findMany({
      where: { actionId: actionId },
      orderBy: { orderIndex: 'asc' },
      include: {},
    });
  }

  findOne(id: string) {
    return this.prisma.choice.findUniqueOrThrow({
      where: { id },
      include: {},
    });
  }

  update(id: string, dto: UpdateChoiceDto) {
    return this.prisma.choice.update({
      where: { id },
      data: {
        actionId: dto.actionId,
        label: dto.label,
      },
    });
  }

  remove(id: string) {
    return this.prisma.choice.delete({
      where: { id },
    });
  }
}
