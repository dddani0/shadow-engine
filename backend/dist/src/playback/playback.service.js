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
exports.PlaybackService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PlaybackService = class PlaybackService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getScene(projectId, sceneId) {
        if (sceneId) {
            const scene = await this.prisma.scene.findFirstOrThrow({
                where: { id: sceneId, projectId },
                include: {
                    choicesFrom: {
                        orderBy: { orderIndex: 'asc' },
                        select: { id: true, label: true, toSceneId: true },
                    },
                },
            });
            return {
                scene: {
                    id: scene.id,
                    title: scene.title,
                    content: scene.content,
                    metadata: scene.metadata,
                    orderIndex: scene.orderIndex,
                },
                choices: scene.choicesFrom,
            };
        }
        const firstScene = await this.prisma.scene.findFirst({
            where: { projectId },
            orderBy: { orderIndex: 'asc' },
            include: {
                choicesFrom: {
                    orderBy: { orderIndex: 'asc' },
                    select: { id: true, label: true, toSceneId: true },
                },
            },
        });
        if (!firstScene) {
            return { scene: null, choices: [] };
        }
        return {
            scene: {
                id: firstScene.id,
                title: firstScene.title,
                content: firstScene.content,
                metadata: firstScene.metadata,
                orderIndex: firstScene.orderIndex,
            },
            choices: firstScene.choicesFrom,
        };
    }
};
exports.PlaybackService = PlaybackService;
exports.PlaybackService = PlaybackService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PlaybackService);
//# sourceMappingURL=playback.service.js.map