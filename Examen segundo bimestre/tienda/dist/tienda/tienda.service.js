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
exports.TiendaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tienda_entity_1 = require("./tienda.entity");
const typeorm_2 = require("typeorm");
let TiendaService = class TiendaService {
    constructor(repository) {
        this.repository = repository;
    }
    crearUno(tienda) {
        return this.repository.save(tienda);
    }
    buscarTodos(textoConsulta) {
        let consulta = {};
        if (textoConsulta) {
            consulta = {
                where: [
                    {
                        nombre: typeorm_2.Like(`%${textoConsulta}%`)
                    },
                    {
                        ruc: typeorm_2.Like(`%${textoConsulta}%`)
                    }
                ]
            };
        }
        return this.repository.find(consulta);
    }
    buscarUno(id) {
        return this.repository.findOne(id);
    }
    editarUno(tienda) {
        return this.repository.save(tienda);
    }
    eliminarUno(id) {
        return this.repository.delete(id);
    }
};
TiendaService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(tienda_entity_1.TiendaEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TiendaService);
exports.TiendaService = TiendaService;
//# sourceMappingURL=tienda.service.js.map