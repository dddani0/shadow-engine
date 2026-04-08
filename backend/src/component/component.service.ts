import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';

@Injectable()
export class ComponentService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateComponentDto) {
    return this.prisma.component.create({
      data: {
        title: dto.title ?? 'Untitled Component',
        sceneId: dto.sceneId,
        sprite: dto.sprite
          ? {
              create: {
                path: dto.sprite.path,
              },
            }
          : undefined,
      },
    });
  }

  findAll() {
    return this.prisma.component.findMany({
      include: {
        sprite: true,
        textBox: true,
        scene: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.component.findUnique({
      where: { id },
      include: {
        sprite: true,
        textBox: true,
        scene: true,
      },
    });
  }

  update(id: string, dto: UpdateComponentDto) {
    const data: {
      title?: string;
      sceneId?: string;
      sprite?: {
        upsert: {
          create: { path: string };
          update: { path: string };
        };
      };
    } = {};
    if (dto.title !== undefined) {
      data.title = dto.title;
    }
    if (dto.sceneId !== undefined) {
      data.sceneId = dto.sceneId;
    }
    if (dto.sprite !== undefined) {
      data.sprite = {
        upsert: {
          create: {
            path: dto.sprite.path ?? '',
          },
          update: {
            path: dto.sprite.path ?? '',
          },
        },
      };
    }

    return this.prisma.component.update({
      where: { id },
      data,
      include: {
        sprite: true,
        textBox: true,
        scene: true,
      },
    });
  }

  remove(id: string) {
    return this.prisma.component.delete({
      where: { id },
    });
  }

  findByScene(sceneId: string) {
    return this.prisma.component.findMany({
      where: { sceneId },
      include: {
        sprite: true,
        textBox: true,
        scene: true,
      },
    });
  }
}
