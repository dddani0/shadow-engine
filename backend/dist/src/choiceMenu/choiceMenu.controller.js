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
exports.ChoiceMenuController = void 0;
const common_1 = require("@nestjs/common");
const choiceMenu_service_1 = require("./choiceMenu.service");
const create_choicemenu_dto_1 = require("./dto/create-choicemenu.dto");
const update_choicemenu_dto_1 = require("./dto/update-choicemenu.dto");
let ChoiceMenuController = class ChoiceMenuController {
    choicesService;
    constructor(choicesService) {
        this.choicesService = choicesService;
    }
    create(dto) {
        return this.choicesService.create(dto);
    }
    findByScene(actionId) {
        return this.choicesService.findByComponent(actionId);
    }
    findOne(id) {
        return this.choicesService.findOne(id);
    }
    update(id, dto) {
        return this.choicesService.update(id, dto);
    }
    remove(id) {
        return this.choicesService.remove(id);
    }
};
exports.ChoiceMenuController = ChoiceMenuController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_choicemenu_dto_1.CreateChoiceMenuDto]),
    __metadata("design:returntype", void 0)
], ChoiceMenuController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('actionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChoiceMenuController.prototype, "findByScene", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChoiceMenuController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_choicemenu_dto_1.UpdateChoiceMenuDto]),
    __metadata("design:returntype", void 0)
], ChoiceMenuController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChoiceMenuController.prototype, "remove", null);
exports.ChoiceMenuController = ChoiceMenuController = __decorate([
    (0, common_1.Controller)('choiceMenu'),
    __metadata("design:paramtypes", [choiceMenu_service_1.ChoiceMenuService])
], ChoiceMenuController);
//# sourceMappingURL=choiceMenu.controller.js.map