"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScenesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ScenesService = class ScenesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(dto) {
        return this.prisma.scene.create({
            data: {
                projectId: dto.projectId,
                title: dto.title ?? null,
                orderIndex: dto.orderIndex ?? 0,
                metadata: (dto.metadata ??
                    undefined),
                timeline: {
                    create: {},
                },
            },
            include: { timeline: true },
        });
    }
    findByProject(projectId) {
        return this.prisma.scene.findMany({
            where: { projectId },
            orderBy: { orderIndex: 'asc' },
            include: { timeline: true },
        });
    }
    findOne(id) {
        return this.prisma.scene.findUniqueOrThrow({
            where: { id },
            include: {
                choicesFrom: { orderBy: { orderIndex: 'asc' } },
                timeline: true,
            },
        });
    }
    update(id, dto) {
        return this.prisma.scene.update({
            where: { id },
            data: {
                ...(dto.title !== undefined && { title: dto.title }),
                ...(dto.orderIndex !== undefined && { orderIndex: dto.orderIndex }),
                ...(dto.metadata !== undefined && {
                    metadata: dto.metadata,
                }),
            },
        });
    }
    remove(id) {
        return this.prisma.scene.delete({
            where: { id },
        });
    }
};
exports.ScenesService = ScenesService;
exports.ScenesService = ScenesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ScenesService);
//# sourceMappingURL=scenes.service.js.map