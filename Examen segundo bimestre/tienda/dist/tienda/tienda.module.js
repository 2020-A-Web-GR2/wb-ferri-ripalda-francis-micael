"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TiendaModule = void 0;
const common_1 = require("@nestjs/common");
const tienda_controller_1 = require("./tienda.controller");
const tienda_service_1 = require("./tienda.service");
const tienda_entity_1 = require("./tienda.entity");
const typeorm_1 = require("@nestjs/typeorm");
let TiendaModule = class TiendaModule {
};
TiendaModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([tienda_entity_1.TiendaEntity], "default")
        ],
        controllers: [
            tienda_controller_1.TiendaController
        ],
        providers: [
            tienda_service_1.TiendaService
        ]
    })
], TiendaModule);
exports.TiendaModule = TiendaModule;
//# sourceMappingURL=tienda.module.js.map