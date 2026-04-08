import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSpriteDto } from './dto/create-sprite.dto';
import { UpdateSpriteDto } from './dto/update-sprite.dto';

@Injectable()
export class SpriteService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateSpriteDto) {
    return this.prisma.sprite.create({
      data: {
        path: dto.path,
      },
    });
  }

  findAll() {
    return this.prisma.sprite.findMany({
      include: {
        component: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.sprite.findUnique({
      where: { id },
      include: {
        component: true,
      },
    });
  }

  update(id: string, dto: UpdateSpriteDto) {
    return this.prisma.sprite.update({
      where: { id },
      data: {
        path: dto.path,
        componentId: dto.id,
      },
    });
  }

  remove(id: string) {
    return this.prisma.sprite.delete({
      where: { id },
    });
  }
}
