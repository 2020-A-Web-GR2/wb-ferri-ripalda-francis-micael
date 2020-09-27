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
exports.TiendaCreateDto = void 0;
const class_validator_1 = require("class-validator");
class TiendaCreateDto {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.MinLength(3),
    class_validator_1.MaxLength(45),
    __metadata("design:type", String)
], TiendaCreateDto.prototype, "nombre", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumberString(),
    class_validator_1.Length(13),
    __metadata("design:type", String)
], TiendaCreateDto.prototype, "ruc", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.MinLength(3),
    class_validator_1.MaxLength(100),
    __metadata("design:type", String)
], TiendaCreateDto.prototype, "ubicacion", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.MinLength(3),
    class_validator_1.MaxLength(45),
    __metadata("design:type", String)
], TiendaCreateDto.prototype, "tipo", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.MinLength(3),
    class_validator_1.MaxLength(100),
    __metadata("design:type", String)
], TiendaCreateDto.prototype, "responsable", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    __metadata("design:type", Number)
], TiendaCreateDto.prototype, "dinero", void 0);
exports.TiendaCreateDto = TiendaCreateDto;
//# sourceMappingURL=tienda.create.dto.js.map