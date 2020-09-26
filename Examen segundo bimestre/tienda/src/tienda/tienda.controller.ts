import { BadRequestException, Body, Controller, Delete, Get, InternalServerErrorException, Param, Post, Put } from "@nestjs/common";
import { TiendaService } from './tienda.service';
import { TiendaCreateDto } from './dto/tienda.create.dto';
import { validate, ValidationError } from 'class-validator';
import { TiendaEntity } from './tienda.entity';
import { TiendaUpdateDto } from './dto/tienda.update.dto';


@Controller("tienda")
export class TiendaController {
    constructor(private readonly tiendaService: TiendaService){}

    @Get()
    async mostrarTodos(){
        try {
            const respuesta = await this.tiendaService.buscarTodos();
            if(respuesta){
                return  respuesta;
            } else {
                throw new InternalServerErrorException({message: "Registro no encontrado"});
            }
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException({mensaje: "Error del servidor"});
        }
    }

    @Get(":id")
    async verUno(
        @Param() parametrosRuta
    ){
        const id = Number(parametrosRuta.id);
        if(id === NaN || id === null){
            throw new BadRequestException({mensaje: "Error en ruta"});
        } 
        try {
            const respuesta = this.tiendaService.buscarUno(id);
            if(respuesta){
                return  respuesta;
            } else {
                throw new InternalServerErrorException({message: "Registro no encontrado"});
            }
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException({message: "Error del servidor"});
        }
    }

    @Post()
    async crearUno(
        @Body() parametrosCuerpo
    ){
        // Validador
        const tiendaCreateDto = new TiendaCreateDto(); 
        // Datos
        tiendaCreateDto.nombre = parametrosCuerpo.nombre
        tiendaCreateDto.ruc = parametrosCuerpo.ruc;
        tiendaCreateDto.ubicacion = parametrosCuerpo.ubicacion;
        tiendaCreateDto.tipo = parametrosCuerpo.tipo;
        tiendaCreateDto.responsable = parametrosCuerpo.responsable;
        tiendaCreateDto.dinero = parametrosCuerpo.dinero;
        // Se asigna las variables al Dto
        try {
            const errores: ValidationError[] =  await validate(tiendaCreateDto);
            if(errores.length > 0){
                console.log(errores);
                throw new BadRequestException({mensaje: "Error en los campos"});
            } else {
                // Crear nueva instancia
                const nuevaTienda = new TiendaEntity();
                nuevaTienda.nombre = tiendaCreateDto.nombre;
                nuevaTienda.ruc = tiendaCreateDto.ruc;
                nuevaTienda.ubicacion = tiendaCreateDto.ubicacion;
                nuevaTienda.tipo = tiendaCreateDto.tipo;
                nuevaTienda.responsable = tiendaCreateDto.responsable;
                nuevaTienda.dinero = tiendaCreateDto.dinero;
                // Enviar a base de datos
                const respuesta = await this.tiendaService.crearUno(nuevaTienda);
                if(respuesta){
                    return  respuesta;
                } else {
                    throw new InternalServerErrorException({message: "Registro no encontrado"});
                }
            }
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException({message: "Error del servidor"});
        }
    }

    @Put(":id")
    async editarUno(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo
    ){
        const id = Number(parametrosRuta.id);
        if(id === NaN || id === null){
            throw new BadRequestException({mensaje: "Error en ruta"});
        }
        // Validador
        const tiendaUpdateDto = new TiendaUpdateDto();
        // Datos
        tiendaUpdateDto.id = id;
        tiendaUpdateDto.nombre = parametrosCuerpo.nombre;
        tiendaUpdateDto.ubicacion = parametrosCuerpo.ubicacion;
        tiendaUpdateDto.tipo = parametrosCuerpo.tipo;
        tiendaUpdateDto.responsable = parametrosCuerpo.responsable;
        tiendaUpdateDto.dinero = parametrosCuerpo.dinero;
        try {
            const errores: ValidationError[] = await validate(tiendaUpdateDto);
            if(errores.length > 0){
                console.log(errores);
                throw new BadRequestException({mensaje: "Error en los campos"});
            } else {
                // Craer tienda actualizar
                const actualizarTienda = new TiendaEntity();
                actualizarTienda.id = tiendaUpdateDto.id;
                actualizarTienda.nombre = tiendaUpdateDto.nombre;
                actualizarTienda.ubicacion = tiendaUpdateDto.ubicacion;
                actualizarTienda.tipo = tiendaUpdateDto.tipo;
                actualizarTienda.responsable = tiendaUpdateDto.responsable;
                actualizarTienda.dinero = tiendaUpdateDto.dinero;
                // Enviar a la base de datos
                const respuesta = await this.tiendaService.editarUno(actualizarTienda);
                if(respuesta){
                    return  respuesta;
                } else {
                    throw new InternalServerErrorException({message: "Registro no encontrado"});
                }
            }
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException({message: "Error del servidor"});
        }
    }

    @Delete(":id")
    async eliminarUno(
        @Param() parametrosRuta
    ){
        const id = Number(parametrosRuta.id);
        if(id === NaN || id === null){
            throw new BadRequestException({mensaje: "Error en ruta"});
        }
        try {
            const respuesta = await this.tiendaService.elimininarUno(id);
            if(respuesta){
                return  respuesta;
            } else {
                throw new InternalServerErrorException({message: "Registro no encontrado"});
            }
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException({message: "Error del servidor"})
        }
    }
    
}