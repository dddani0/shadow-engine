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
exports.ChoicesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ChoicesService = class ChoicesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(dto) {
        return this.prisma.choice.create({
            data: {
                fromSceneId: dto.fromSceneId,
                toSceneId: dto.toSceneId,
                label: dto.label,
                orderIndex: dto.orderIndex ?? 0,
            },
        });
    }
    findByScene(sceneId) {
        return this.prisma.choice.findMany({
            where: { fromSceneId: sceneId },
            orderBy: { orderIndex: 'asc' },
            include: {
                toScene: { select: { id: true, title: true, content: true } },
            },
        });
    }
    findOne(id) {
        return this.prisma.choice.findUniqueOrThrow({
            where: { id },
            include: { fromScene: true, toScene: true },
        });
    }
    update(id, dto) {
        return this.prisma.choice.update({
            where: { id },
            data: {
                ...(dto.toSceneId !== undefined && { toSceneId: dto.toSceneId }),
                ...(dto.label !== undefined && { label: dto.label }),
                ...(dto.orderIndex !== undefined && { orderIndex: dto.orderIndex }),
            },
        });
    }
    remove(id) {
        return this.prisma.choice.delete({
            where: { id },
        });
    }
};
exports.ChoicesService = ChoicesService;
exports.ChoicesService = ChoicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChoicesService);
//# sourceMappingURL=choices.service.js.map