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
        fromSceneId: dto.fromSceneId,
        toSceneId: dto.toSceneId,
        label: dto.label,
        orderIndex: dto.orderIndex ?? 0,
      },
    });
  }

  findByScene(sceneId: string) {
    return this.prisma.choice.findMany({
      where: { fromSceneId: sceneId },
      orderBy: { orderIndex: 'asc' },
      include: {
        toScene: { select: { id: true, title: true } },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.choice.findUniqueOrThrow({
      where: { id },
      include: { fromScene: true, toScene: true },
    });
  }

  update(id: string, dto: UpdateChoiceDto) {
    return this.prisma.choice.update({
      where: { id },
      data: {
        ...(dto.toSceneId !== undefined && { toSceneId: dto.toSceneId }),
        ...(dto.label !== undefined && { label: dto.label }),
        ...(dto.orderIndex !== undefined && { orderIndex: dto.orderIndex }),
      },
    });
  }

  remove(id: string) {
    return this.prisma.choice.delete({
      where: { id },
    });
  }
}
