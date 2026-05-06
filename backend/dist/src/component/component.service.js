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
exports.ComponentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ComponentService = class ComponentService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const scene = await this.prisma.scene.findUnique({
            where: { id: dto.sceneId },
        });
        console.log(dto.sceneId);
        if (!scene) {
            throw new Error(`Scene with id ${dto.sceneId} not found`);
        }
        return this.prisma.component.create({
            data: {
                title: dto.title ?? 'Untitled Component',
                sceneId: dto.sceneId,
                sprite: dto.sprite
                    ? {
                        create: {
                            path: dto.sprite?.path,
                        },
                    }
                    : undefined,
                textBox: dto.textbox
                    ? {
                        create: {
                            content: [],
                            charPerSecond: 5,
                        },
                    }
                    : undefined,
                choiceMenu: dto.choiceMenu
                    ? {
                        create: {},
                    }
                    : undefined,
            },
        });
    }
    findAll() {
        return this.prisma.component.findMany({
            include: {
                sprite: true,
                textBox: true,
                scene: true,
                choiceMenu: true,
            },
        });
    }
    findOne(id) {
        return this.prisma.component.findUnique({
            where: { id },
            include: {
                sprite: true,
                textBox: true,
                scene: true,
                choiceMenu: true,
            },
        });
    }
    update(id, dto) {
        const data = {};
        if (dto.title !== undefined) {
            data.title = dto.title;
        }
        if (dto.sceneId !== undefined) {
            data.sceneId = dto.sceneId;
        }
        if (dto.sprite !== undefined) {
            data.sprite = {
                upsert: {
                    create: {
                        path: dto.sprite.path ?? '',
                    },
                    update: {
                        path: dto.sprite.path ?? '',
                    },
                },
            };
        }
        if (dto.choiceMenu !== undefined) {
        }
        return this.prisma.component.update({
            where: { id },
            data,
            include: {
                sprite: true,
                textBox: true,
                scene: true,
            },
        });
    }
    remove(id) {
        return this.prisma.component.delete({
            where: { id },
        });
    }
    findByScene(sceneId) {
        return this.prisma.component.findMany({
            where: { sceneId },
            include: {
                sprite: true,
                textBox: true,
                scene: true,
            },
        });
    }
};
exports.ComponentService = ComponentService;
exports.ComponentService = ComponentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ComponentService);
//# sourceMappingURL=component.service.js.map