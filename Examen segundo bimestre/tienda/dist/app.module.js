"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const tienda_module_1 = require("./tienda/tienda.module");
const typeorm_1 = require("@nestjs/typeorm");
const tienda_entity_1 = require("./tienda/tienda.entity");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            tienda_module_1.TiendaModule,
            typeorm_1.TypeOrmModule.forRoot({
                name: "default",
                type: "mysql",
                host: "34.121.130.26",
                port: 5003,
                username: "root",
                password: "12345678",
                database: 'tienda',
                entities: [tienda_entity_1.TiendaEntity],
                synchronize: true,
                dropSchema: false
            })
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map