import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSceneDto } from './dto/create-scene.dto';
import { UpdateSceneDto } from './dto/update-scene.dto';

@Injectable()
export class ScenesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateSceneDto) {
    return this.prisma.scene.create({
      data: {
        projectId: dto.projectId,
        title: dto.title ?? null,
        orderIndex: dto.orderIndex ?? 0,
        metadata: (dto.metadata ??
          undefined) as unknown as Prisma.InputJsonValue,
        timeline: {
          create: {},
        },
      },
      include: { timeline: true },
    });
  }

  findByProject(projectId: string) {
    return this.prisma.scene.findMany({
      where: { projectId },
      orderBy: { orderIndex: 'asc' },
      include: {
        timeline: {
          include: { actions: true },
        },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.scene.findUniqueOrThrow({
      where: { id },
      include: {
        timeline: {
          include: {
            actions: true,
          },
        },
      },
    });
  }

  update(id: string, dto: UpdateSceneDto) {
    return this.prisma.scene.update({
      where: { id },
      data: {
        ...(dto.title !== undefined && { title: dto.title }),
        ...(dto.orderIndex !== undefined && { orderIndex: dto.orderIndex }),
        ...(dto.metadata !== undefined && {
          metadata: dto.metadata as unknown as Prisma.InputJsonValue,
        }),
      },
    });
  }

  remove(id: string) {
    return this.prisma.scene.delete({
      where: { id },
    });
  }
}
