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
exports.TimelineService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TimelineService = class TimelineService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(dto) {
        return this.prisma.timeline.create({
            data: {
                sceneId: dto.id,
            },
        });
    }
    findAll() {
        return this.prisma.timeline.findMany({});
    }
    findOne(id) {
        return this.prisma.timeline.findUniqueOrThrow({
            where: { id },
            include: {
                actions: {},
            },
        });
    }
    update(id, dto) {
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
    remove(id) {
        return this.prisma.timeline.delete({
            where: { id },
        });
    }
};
exports.TimelineService = TimelineService;
exports.TimelineService = TimelineService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TimelineService);
//# sourceMappingURL=timeline.service.js.map