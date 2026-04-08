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
exports.ActionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ActionService = class ActionService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(dto) {
        return this.prisma.action.create({
            data: {
                timelineId: dto.timelineId,
                type: dto.type,
                componentId: dto.componentId,
            },
        });
    }
    findAll() {
        return this.prisma.action.findMany({
            include: {
                timeline: true,
            },
        });
    }
    findOne(id) {
        return this.prisma.action.findUniqueOrThrow({
            where: { id },
            include: {
                timeline: true,
            },
        });
    }
    update(id, dto) {
        return this.prisma.action.update({
            where: { id },
            data: {
                timelineId: dto.timelineId,
                type: dto.type,
                componentId: dto.componentId,
            },
        });
    }
    remove(id) {
        return this.prisma.action.delete({
            where: { id },
        });
    }
    findByTimeline(timelineId) {
        return this.prisma.action.findMany({
            where: { timelineId },
            include: {
                timeline: true,
            },
        });
    }
};
exports.ActionService = ActionService;
exports.ActionService = ActionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ActionService);
//# sourceMappingURL=action.service.js.map