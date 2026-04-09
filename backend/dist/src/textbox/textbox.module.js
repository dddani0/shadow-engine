"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextboxModule = void 0;
const common_1 = require("@nestjs/common");
const textbox_service_1 = require("./textbox.service");
const textbox_controller_1 = require("./textbox.controller");
let TextboxModule = class TextboxModule {
};
exports.TextboxModule = TextboxModule;
exports.TextboxModule = TextboxModule = __decorate([
    (0, common_1.Module)({
        controllers: [textbox_controller_1.TextboxController],
        providers: [textbox_service_1.TextboxService],
        exports: [textbox_service_1.TextboxService],
    })
], TextboxModule);
//# sourceMappingURL=textbox.module.js.map