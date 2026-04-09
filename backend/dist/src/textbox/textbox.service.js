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
exports.TextboxService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TextboxService = class TextboxService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const component = await this.prisma.component.findUnique({
            where: { id: dto.componentId },
        });
        if (!component) {
            throw new Error(`Component with id ${dto.componentId} not found`);
        }
        return this.prisma.textbox.create({
            data: {
                title: dto.title,
                content: dto.content,
                charPerSecond: dto.charPerSecond,
                component: {
                    connect: { id: dto.componentId },
                },
            },
            include: {
                component: true,
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
    findOne(id) {
        return this.prisma.textbox.findUnique({
            where: { id },
            include: {
                component: true,
            },
        });
    }
    async update(id, dto) {
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
                ...(dto.charPerSecond !== undefined && { charPerSecond: dto.charPerSecond }),
                ...(dto.componentId !== undefined && {
                    component: { connect: { id: dto.componentId } },
                }),
            },
            include: {
                component: true,
            },
        });
    }
    remove(id) {
        return this.prisma.textbox.delete({
            where: { id },
        });
    }
    findByComponent(componentId) {
        return this.prisma.textbox.findFirst({
            where: { componentId },
            include: {
                component: true,
            },
        });
    }
};
exports.TextboxService = TextboxService;
exports.TextboxService = TextboxService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TextboxService);
//# sourceMappingURL=textbox.service.js.map