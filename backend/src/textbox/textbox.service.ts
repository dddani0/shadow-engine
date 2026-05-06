import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTextboxDto } from './dto/create-textbox.dto';
import { UpdateTextboxDto } from './dto/update-textbox.dto';

@Injectable()
export class TextboxService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTextboxDto) {
    return this.prisma.textbox.create({
      data: {
        title: dto.title,
        content: dto.content,
        charPerSecond: dto.charPerSecond,
      },
    });
  }

  findAll() {
    return this.prisma.textbox.findMany({
      include: {
        component: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.textbox.findUnique({
      where: { id },
      include: {
        component: true,
      },
    });
  }

  async update(id: string, dto: UpdateTextboxDto) {
    // Validate componentId if provided
    if (dto.componentId) {
      const component = await this.prisma.component.findUnique({
        where: { id: dto.componentId },
      });

      if (!component) {
        throw new Error(`Component with id ${dto.componentId} not found`);
      }
    }

    return this.prisma.textbox.update({
      where: { id },
      data: {
        ...(dto.title !== undefined && { title: dto.title }),
        ...(dto.content !== undefined && { content: dto.content }),
        ...(dto.charPerSecond !== undefined && {
          charPerSecond: dto.charPerSecond,
        }),
        ...(dto.componentId !== undefined && {
          component: { connect: { id: dto.componentId } },
        }),
      },
      include: {
        component: true,
      },
    });
  }

  remove(id: string) {
    return this.prisma.textbox.delete({
      where: { id },
    });
  }

  findByComponent(componentId: string) {
    return this.prisma.textbox.findFirst({
      where: { componentId },
      include: {
        component: true,
      },
    });
  }
}
