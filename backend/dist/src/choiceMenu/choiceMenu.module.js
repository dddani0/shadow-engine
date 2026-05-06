"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChoiceMenuModule = void 0;
const common_1 = require("@nestjs/common");
const choiceMenu_service_1 = require("./choiceMenu.service");
const choiceMenu_controller_1 = require("./choiceMenu.controller");
let ChoiceMenuModule = class ChoiceMenuModule {
};
exports.ChoiceMenuModule = ChoiceMenuModule;
exports.ChoiceMenuModule = ChoiceMenuModule = __decorate([
    (0, common_1.Module)({
        controllers: [choiceMenu_controller_1.ChoiceMenuController],
        providers: [choiceMenu_service_1.ChoiceMenuService],
        exports: [choiceMenu_service_1.ChoiceMenuService],
    })
], ChoiceMenuModule);
//# sourceMappingURL=choiceMenu.module.js.map