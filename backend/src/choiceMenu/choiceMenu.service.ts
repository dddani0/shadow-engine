import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChoiceMenuDto } from './dto/create-choicemenu.dto';
import { UpdateChoiceMenuDto } from './dto/update-choicemenu.dto';

@Injectable()
export class ChoiceMenuService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateChoiceMenuDto) {
    return this.prisma.choiceMenu.create({
      data: {
        title: dto.title ?? '',
        description: dto.description ?? '',
        componentId: dto.componentId ?? '',
      },
    });
  }

  findByComponent(componentId: string) {
    return this.prisma.choiceMenu.findMany({
      where: { componentId: componentId },
      include: {},
    });
  }

  findOne(id: string) {
    return this.prisma.choiceMenu.findUniqueOrThrow({
      where: { id },
      include: {
        choices: true,
      },
    });
  }

  update(id: string, dto: UpdateChoiceMenuDto) {
    return this.prisma.choiceMenu.update({
      where: { id },
      data: {
        ...(dto.title != null && { title: dto.title }),
        ...(dto.description != null && { description: dto.description }),
        ...(dto.componentId != null && { componentId: dto.componentId }),
        ...(dto.choices != null && {
          choices: {}, //Implement the update of choices.
        }),
      },
    });
  }

  remove(id: string) {
    return this.prisma.choiceMenu.delete({
      where: { id },
    });
  }
}
