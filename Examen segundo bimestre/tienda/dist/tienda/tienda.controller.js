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
exports.TiendaController = void 0;
const common_1 = require("@nestjs/common");
const tienda_service_1 = require("./tienda.service");
const tienda_create_dto_1 = require("./dto/tienda.create.dto");
const class_validator_1 = require("class-validator");
const tienda_entity_1 = require("./tienda.entity");
const tienda_update_dto_1 = require("./dto/tienda.update.dto");
let TiendaController = class TiendaController {
    constructor(tiendaService) {
        this.tiendaService = tiendaService;
    }
    async mostrarTodos() {
        try {
            const respuesta = await this.tiendaService.buscarTodos();
            if (respuesta) {
                return respuesta;
            }
            else {
                throw new common_1.InternalServerErrorException({ message: "Registro no encontrado" });
            }
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException({ mensaje: "Error del servidor" });
        }
    }
    async verUno(parametrosRuta) {
        const id = Number(parametrosRuta.id);
        if (id === NaN || id === null) {
            throw new common_1.BadRequestException({ mensaje: "Error en ruta" });
        }
        try {
            const respuesta = this.tiendaService.buscarUno(id);
            if (respuesta) {
                return respuesta;
            }
            else {
                throw new common_1.InternalServerErrorException({ message: "Registro no encontrado" });
            }
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException({ message: "Error del servidor" });
        }
    }
    async crearUno(parametrosCuerpo) {
        const tiendaCreateDto = this.asignarValidadorCrear(parametrosCuerpo);
        try {
            const errores = await class_validator_1.validate(tiendaCreateDto);
            if (errores.length > 0) {
                console.log(errores);
                throw new common_1.BadRequestException({ mensaje: "Error en los campos" });
            }
            else {
                const nuevaTienda = this.crearInstanciaNueva(tiendaCreateDto);
                const respuesta = await this.tiendaService.crearUno(nuevaTienda);
                if (respuesta) {
                    return respuesta;
                }
                else {
                    throw new common_1.InternalServerErrorException({ message: "Registro no encontrado" });
                }
            }
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException({ message: "Error del servidor" });
        }
    }
    async editarUno(parametrosRuta, parametrosCuerpo) {
        const id = Number(parametrosRuta.id);
        const tiendaUpdateDto = this.asignarValidadorActualizar(parametrosCuerpo, id);
        try {
            const errores = await class_validator_1.validate(tiendaUpdateDto);
            if (errores.length > 0) {
                console.log(errores);
                throw new common_1.BadRequestException({ mensaje: "Error en los campos" });
            }
            else {
                const actualizarTienda = this.crearInstanciaActualizar(tiendaUpdateDto);
                const respuesta = await this.tiendaService.editarUno(actualizarTienda);
                if (respuesta) {
                    return respuesta;
                }
                else {
                    throw new common_1.InternalServerErrorException({ message: "Registro no encontrado" });
                }
            }
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException({ message: "Error del servidor" });
        }
    }
    async eliminarUno(parametrosRuta) {
        const id = Number(parametrosRuta.id);
        if (id === NaN || id === null) {
            throw new common_1.BadRequestException({ mensaje: "Error en ruta" });
        }
        try {
            const respuesta = await this.tiendaService.eliminarUno(id);
            if (respuesta) {
                return respuesta;
            }
            else {
                throw new common_1.InternalServerErrorException({ message: "Registro no encontrado" });
            }
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException({ message: "Error del servidor" });
        }
    }
    async inicio(res, parametrosConsulta, session) {
        if (!session.usuario) {
            return res.redirect("/login");
        }
        let resultadoEncontrado;
        try {
            resultadoEncontrado = await this.tiendaService.buscarTodos(parametrosConsulta.busqueda);
        }
        catch (error) {
            console.log("Error: ", error);
            throw new common_1.InternalServerErrorException("Error encontrando tiendas");
        }
        if (resultadoEncontrado) {
            return res.render("tienda/inicio", {
                arregloTiendas: resultadoEncontrado,
                parametrosConsulta: parametrosConsulta
            });
        }
        else {
            throw new common_1.NotFoundException("No se encontraron tiendas");
        }
    }
    crearTiendaVista(parametrosConsulta, res, session) {
        if (!session.usuario) {
            return res.redirect("/login");
        }
        return res.render('tienda/crear', {
            error: parametrosConsulta.error,
            nombre: parametrosConsulta.nombre,
            ruc: parametrosConsulta.ruc,
            ubicacion: parametrosConsulta.ubicacion,
            tipo: parametrosConsulta.tipo,
            responsable: parametrosConsulta.responsable,
            dinero: parametrosConsulta.dinero
        });
    }
    async editarTiendaVista(parametrosConsulta, parametrosRuta, res, session) {
        if (!session.usuario) {
            return res.redirect("/login");
        }
        const id = Number(parametrosRuta.id);
        let tiendaEncontrada;
        if (id === NaN || id === null) {
            throw new common_1.BadRequestException({ mensaje: "Error en ruta" });
        }
        try {
            tiendaEncontrada = await this.tiendaService.buscarUno(id);
        }
        catch (error) {
            console.log(error);
            return res.redirect("/tienda/vista/inicio?mensaje=Error buscando tienda");
        }
        if (tiendaEncontrada) {
            return res.render('tienda/crear', {
                error: parametrosConsulta.error,
                tienda: tiendaEncontrada
            });
        }
        else {
            return res.redirect("/tienda/vista/inicio?mensaje=Tiewnda no encontrada");
        }
    }
    async crearDesdeVista(parametrosCuerpo, res, session) {
        if (!session.usuario) {
            return res.redirect("/login");
        }
        let camposError;
        const tiendaCreateDto = this.asignarValidadorCrear(parametrosCuerpo);
        try {
            const errores = await class_validator_1.validate(tiendaCreateDto);
            if (errores.length > 0) {
                console.log(errores);
                const mensajeError = 'Error en campos';
                camposError = `&nombre=${tiendaCreateDto.nombre}&ruc=${tiendaCreateDto.ruc}&ubicacion=${tiendaCreateDto.ubicacion}&tipo=${tiendaCreateDto.tipo}&responsable=${tiendaCreateDto.responsable}&dinero=${tiendaCreateDto.dinero}`;
                return res.redirect('/tienda/vista/crear?error=' + mensajeError + camposError);
            }
            else {
                const nuevaTienda = this.crearInstanciaNueva(tiendaCreateDto);
                let respuestaCreacionTienda = await this.tiendaService.crearUno(nuevaTienda);
                if (respuestaCreacionTienda) {
                    return res.redirect('/tienda/vista/inicio');
                }
                else {
                    const mensajeError = 'Error creando tienda';
                    return res.redirect('/tienda/vista/crear?error=' + mensajeError + camposError);
                }
            }
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException({ message: "Error del servidor" });
        }
    }
    async editarDesdeVista(parametrosRuta, parametrosCuerpo, res, session) {
        if (!session.usuario) {
            return res.redirect("/login");
        }
        const id = Number(parametrosRuta.id);
        const tiendaUpdateDto = this.asignarValidadorActualizar(parametrosCuerpo, id);
        try {
            const errores = await class_validator_1.validate(tiendaUpdateDto);
            if (errores.length > 0) {
                console.log(errores);
                const mensajeError = 'Error en campos';
                const camposError = `&nombre=${tiendaUpdateDto.nombre}&ubicacion=${tiendaUpdateDto.ubicacion}&tipo=${tiendaUpdateDto.tipo}&responsable=${tiendaUpdateDto.responsable}&dinero=${tiendaUpdateDto.dinero}`;
                return res.redirect('/tienda/vista/crear?error=' + mensajeError + camposError);
            }
            else {
                const actualizarTienda = this.crearInstanciaActualizar(tiendaUpdateDto);
                await this.tiendaService.editarUno(actualizarTienda);
                return res.redirect("/tienda/vista/inicio?mensaje=Tienda editada");
            }
        }
        catch (error) {
            console.log(error);
            return res.redirect("/tienda/vista/inicio?mensaje=Error eliminando tienda");
        }
    }
    async eliminarDesdeVista(parametrosRuta, res, session) {
        if (!session.usuario) {
            return res.redirect("/login");
        }
        try {
            const id = Number(parametrosRuta.id);
            await this.tiendaService.eliminarUno(id);
            return res.redirect("/tienda/vista/inicio?mensaje=Usuario eliminado");
        }
        catch (error) {
            console.log(error);
            return res.redirect("/tienda/vista/inicio?mensaje=Error eliminando tienda");
        }
    }
    asignarValidadorCrear(parametrosCuerpo) {
        const tiendaCreateDto = new tienda_create_dto_1.TiendaCreateDto();
        tiendaCreateDto.nombre = parametrosCuerpo.nombre;
        tiendaCreateDto.ruc = parametrosCuerpo.ruc;
        tiendaCreateDto.ubicacion = parametrosCuerpo.ubicacion;
        tiendaCreateDto.tipo = parametrosCuerpo.tipo;
        tiendaCreateDto.responsable = parametrosCuerpo.responsable;
        tiendaCreateDto.dinero = Number(parametrosCuerpo.dinero);
        return tiendaCreateDto;
    }
    asignarValidadorActualizar(parametrosCuerpo, id) {
        if (id === NaN || id === null) {
            throw new common_1.BadRequestException({ mensaje: "Error en ruta" });
        }
        const tiendaUpdateDto = new tienda_update_dto_1.TiendaUpdateDto();
        tiendaUpdateDto.id = id;
        tiendaUpdateDto.nombre = parametrosCuerpo.nombre;
        tiendaUpdateDto.ubicacion = parametrosCuerpo.ubicacion;
        tiendaUpdateDto.tipo = parametrosCuerpo.tipo;
        tiendaUpdateDto.responsable = parametrosCuerpo.responsable;
        tiendaUpdateDto.dinero = Number(parametrosCuerpo.dinero);
        return tiendaUpdateDto;
    }
    crearInstanciaNueva(tiendaCreateDto) {
        const nuevaTienda = new tienda_entity_1.TiendaEntity();
        nuevaTienda.nombre = tiendaCreateDto.nombre;
        nuevaTienda.ruc = tiendaCreateDto.ruc;
        nuevaTienda.ubicacion = tiendaCreateDto.ubicacion;
        nuevaTienda.tipo = tiendaCreateDto.tipo;
        nuevaTienda.responsable = tiendaCreateDto.responsable;
        nuevaTienda.dinero = tiendaCreateDto.dinero;
        return nuevaTienda;
    }
    crearInstanciaActualizar(tiendaUpdateDto) {
        const actualizarTienda = new tienda_entity_1.TiendaEntity();
        actualizarTienda.id = tiendaUpdateDto.id;
        actualizarTienda.nombre = tiendaUpdateDto.nombre;
        actualizarTienda.ubicacion = tiendaUpdateDto.ubicacion;
        actualizarTienda.tipo = tiendaUpdateDto.tipo;
        actualizarTienda.responsable = tiendaUpdateDto.responsable;
        actualizarTienda.dinero = tiendaUpdateDto.dinero;
        return actualizarTienda;
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TiendaController.prototype, "mostrarTodos", null);
__decorate([
    common_1.Get(":id"),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TiendaController.prototype, "verUno", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TiendaController.prototype, "crearUno", null);
__decorate([
    common_1.Put(":id"),
    __param(0, common_1.Param()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TiendaController.prototype, "editarUno", null);
__decorate([
    common_1.Delete(":id"),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TiendaController.prototype, "eliminarUno", null);
__decorate([
    common_1.Get("vista/inicio"),
    __param(0, common_1.Res()),
    __param(1, common_1.Query()),
    __param(2, common_1.Session()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], TiendaController.prototype, "inicio", null);
__decorate([
    common_1.Get('vista/crear'),
    __param(0, common_1.Query()),
    __param(1, common_1.Res()),
    __param(2, common_1.Session()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], TiendaController.prototype, "crearTiendaVista", null);
__decorate([
    common_1.Get("vista/editar/:id"),
    __param(0, common_1.Query()),
    __param(1, common_1.Param()),
    __param(2, common_1.Res()),
    __param(3, common_1.Session()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], TiendaController.prototype, "editarTiendaVista", null);
__decorate([
    common_1.Post("crearDesdeVista"),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __param(2, common_1.Session()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], TiendaController.prototype, "crearDesdeVista", null);
__decorate([
    common_1.Post("editarDesdeVista/:id"),
    __param(0, common_1.Param()),
    __param(1, common_1.Body()),
    __param(2, common_1.Res()),
    __param(3, common_1.Session()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], TiendaController.prototype, "editarDesdeVista", null);
__decorate([
    common_1.Post("vista/eliminar/:id"),
    __param(0, common_1.Param()),
    __param(1, common_1.Res()),
    __param(2, common_1.Session()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], TiendaController.prototype, "eliminarDesdeVista", null);
TiendaController = __decorate([
    common_1.Controller("tienda"),
    __metadata("design:paramtypes", [tienda_service_1.TiendaService])
], TiendaController);
exports.TiendaController = TiendaController;
//# sourceMappingURL=tienda.controller.js.map