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
exports.ChoiceMenuService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ChoiceMenuService = class ChoiceMenuService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(dto) {
        return this.prisma.choiceMenu.create({
            data: {
                title: dto.title ?? '',
                description: dto.description ?? '',
                componentId: dto.componentId ?? '',
            },
        });
    }
    findByComponent(componentId) {
        return this.prisma.choiceMenu.findMany({
            where: { componentId: componentId },
            include: {},
        });
    }
    findOne(id) {
        return this.prisma.choiceMenu.findUniqueOrThrow({
            where: { id },
            include: {
                choices: true,
            },
        });
    }
    update(id, dto) {
        return this.prisma.choiceMenu.update({
            where: { id },
            data: {
                ...(dto.title != null && { title: dto.title }),
                ...(dto.description != null && { description: dto.description }),
                ...(dto.componentId != null && { componentId: dto.componentId }),
                ...(dto.choices != null && {
                    choices: {},
                }),
            },
        });
    }
    remove(id) {
        return this.prisma.choiceMenu.delete({
            where: { id },
        });
    }
};
exports.ChoiceMenuService = ChoiceMenuService;
exports.ChoiceMenuService = ChoiceMenuService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChoiceMenuService);
//# sourceMappingURL=choiceMenu.service.js.map