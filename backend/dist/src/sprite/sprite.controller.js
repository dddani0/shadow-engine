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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpriteController = void 0;
const common_1 = require("@nestjs/common");
const sprite_service_1 = require("./sprite.service");
const create_sprite_dto_1 = require("./dto/create-sprite.dto");
const update_sprite_dto_1 = require("./dto/update-sprite.dto");
let SpriteController = class SpriteController {
    spriteService;
    constructor(spriteService) {
        this.spriteService = spriteService;
    }
    create(createSpriteDto) {
        return this.spriteService.create(createSpriteDto);
    }
    findAll() {
        return this.spriteService.findAll();
    }
    findOne(id) {
        return this.spriteService.findOne(id);
    }
    update(id, updateSpriteDto) {
        return this.spriteService.update(id, updateSpriteDto);
    }
    remove(id) {
        return this.spriteService.remove(id);
    }
};
exports.SpriteController = SpriteController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sprite_dto_1.CreateSpriteDto]),
    __metadata("design:returntype", void 0)
], SpriteController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SpriteController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SpriteController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_sprite_dto_1.UpdateSpriteDto]),
    __metadata("design:returntype", void 0)
], SpriteController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SpriteController.prototype, "remove", null);
exports.SpriteController = SpriteController = __decorate([
    (0, common_1.Controller)('sprite'),
    __metadata("design:paramtypes", [sprite_service_1.SpriteService])
], SpriteController);
//# sourceMappingURL=sprite.controller.js.map