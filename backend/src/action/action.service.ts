import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateActionDto } from './dto/create-action.dto';
import { UpdateActionDto } from './dto/update-action.dto';

@Injectable()
export class ActionService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateActionDto) {
    return this.prisma.action.create({
      data: {
        timelineId: dto.timelineId,
        type: dto.type,
        spriteId: dto.spriteId!,
      },
    });
  }

  findAll() {
    return this.prisma.action.findMany({
      include: {
        timeline: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.action.findUniqueOrThrow({
      where: { id },
      include: {
        timeline: true,
      },
    });
  }

  update(id: string, dto: UpdateActionDto) {
    return this.prisma.action.update({
      where: { id },
      data: {
        ...(dto.actions?.[0]?.type !== undefined && {
          type: dto.actions[0].type,
        }),
        ...(dto.actions?.[0]?.spriteId !== undefined && {
          spriteId: dto.actions[0].spriteId,
        }),
      },
    });
  }

  remove(id: string) {
    return this.prisma.action.delete({
      where: { id },
    });
  }

  findByTimeline(timelineId: string) {
    return this.prisma.action.findMany({
      where: { timelineId },
      include: {
        timeline: true,
      },
    });
  }
}
