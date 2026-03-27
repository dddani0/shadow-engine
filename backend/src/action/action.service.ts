import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ActionService {
  constructor(private readonly prisma: PrismaService) {}
}
