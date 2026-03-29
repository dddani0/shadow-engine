import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTimelineDto } from './dto/create-timeline.dto';
import { UpdateTimelineDto } from './dto/update-timeline.dto';

@Injectable()
export class TimelineService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateTimelineDto) {
    return this.prisma.timeline.create({
      data: {
        sceneId: dto.id,
      },
    });
  }

  findAll() {
    return this.prisma.timeline.findMany({});
  }

  findOne(id: string) {
    return this.prisma.timeline.findUniqueOrThrow({
      where: { id },
      include: {
        actions: {},
      },
    });
  }

  update(id: string, dto: UpdateTimelineDto) {
    const { actions } = dto;
    return this.prisma.timeline.update({
      where: { id },
      data: {
        ...(dto.id != null && { id: dto.id }),
        ...(actions != null && {
          actions: {
            ...(actions.create && { create: actions.create }),
            ...(actions.update && { update: actions.update }),
            ...(actions.delete && { delete: actions.delete }),
          },
        }),
      },
    });
  }

  remove(id: string) {
    return this.prisma.timeline.delete({
      where: { id },
    });
  }
}
