import { BadRequestException, Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, Post, Put, Query, Res, Session } from "@nestjs/common";
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
        const tiendaCreateDto = this.asignarValidadorCrear(parametrosCuerpo);
        // Se asigna las variables al Dto
        try {
            const errores: ValidationError[] =  await validate(tiendaCreateDto);
            if(errores.length > 0){
                console.log(errores);
                throw new BadRequestException({mensaje: "Error en los campos"});
            } else {
                // Craer nueva tienda
                const nuevaTienda = this.crearInstanciaNueva(tiendaCreateDto);
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
        // Validador
        const tiendaUpdateDto = this.asignarValidadorActualizar(parametrosCuerpo, id);
        try {
            const errores: ValidationError[] = await validate(tiendaUpdateDto);
            if(errores.length > 0){
                console.log(errores);
                throw new BadRequestException({mensaje: "Error en los campos"});
            } else {
                // Craer tienda actualizar
                const actualizarTienda = this.crearInstanciaActualizar(tiendaUpdateDto);
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
            const respuesta = await this.tiendaService.eliminarUno(id);
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


    @Get("vista/inicio")
    async inicio(
        @Res() res,
        @Query() parametrosConsulta,
        @Session() session
    ){
        if(!session.usuario){
            return res.redirect("/login");
        }
        let resultadoEncontrado;
        try {
            resultadoEncontrado = await this.tiendaService.buscarTodos(parametrosConsulta.busqueda);
        } catch (error) {
            console.log("Error: ", error);
            throw new InternalServerErrorException("Error encontrando tiendas")
        }
        if(resultadoEncontrado){
            return res.render("tienda/inicio",
                { 
                    arregloTiendas: resultadoEncontrado,
                    parametrosConsulta: parametrosConsulta
                }   
            )
        } else {
            throw new NotFoundException("No se encontraron tiendas")
        }
    }

    @Get('vista/crear') // Controlador
    crearTiendaVista(
        @Query() parametrosConsulta,
        @Res() res,
        @Session() session
    ) {
        if(!session.usuario){
            return res.redirect("/login");
        }
        return res.render(
            'tienda/crear',
            {
                error: parametrosConsulta.error,
                nombre: parametrosConsulta.nombre,
                ruc: parametrosConsulta.ruc,
                ubicacion: parametrosConsulta.ubicacion,
                tipo: parametrosConsulta.tipo,
                responsable: parametrosConsulta.responsable,
                dinero: parametrosConsulta.dinero
            }
        )
    }

    @Get("vista/editar/:id")
    async editarTiendaVista(
        @Query() parametrosConsulta,
        @Param() parametrosRuta,
        @Res() res,
        @Session() session
    ){
        if(!session.usuario){
            return res.redirect("/login");
        }
        const id = Number(parametrosRuta.id);
        let tiendaEncontrada;
        if(id === NaN || id === null){
            throw new BadRequestException({mensaje: "Error en ruta"});
        }
        try {
            tiendaEncontrada = await this.tiendaService.buscarUno(id);
        } catch(error){
            console.log(error);
            return res.redirect("/tienda/vista/inicio?mensaje=Error buscando tienda");
        }
        if(tiendaEncontrada){
            return res.render(
                'tienda/crear',
                {
                    error: parametrosConsulta.error,
                    tienda: tiendaEncontrada
                }
            )
        } else {
            return res.redirect("/tienda/vista/inicio?mensaje=Tiewnda no encontrada");
        }
    }
    
    @Post("crearDesdeVista")
    async crearDesdeVista(
        @Body() parametrosCuerpo,
        @Res() res,
        @Session() session
    ){
        if(!session.usuario){
            return res.redirect("/login");
        }
        let camposError;
        // Validador
        const tiendaCreateDto = this.asignarValidadorCrear(parametrosCuerpo);
        try {
            const errores: ValidationError[] = await validate(tiendaCreateDto);
            if(errores.length > 0){
                console.log(errores);

                const mensajeError = 'Error en campos'
                camposError = `&nombre=${tiendaCreateDto.nombre}&ruc=${tiendaCreateDto.ruc}&ubicacion=${tiendaCreateDto.ubicacion}&tipo=${tiendaCreateDto.tipo}&responsable=${tiendaCreateDto.responsable}&dinero=${tiendaCreateDto.dinero}`;

                return res.redirect('/tienda/vista/crear?error=' + mensajeError + camposError);
            } else {
                const nuevaTienda = this.crearInstanciaNueva(tiendaCreateDto);
                let respuestaCreacionTienda = await this.tiendaService.crearUno(nuevaTienda);
                if(respuestaCreacionTienda){
                    return res.redirect('/tienda/vista/inicio');
                } else{
                    const mensajeError = 'Error creando tienda'
                    return res.redirect('/tienda/vista/crear?error=' + mensajeError + camposError);
                }
            }
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException({message: "Error del servidor"});
        }
    }

    @Post("editarDesdeVista/:id")
    async editarDesdeVista(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo,
        @Res() res,
        @Session() session
    ){
        if(!session.usuario){
            return res.redirect("/login");
        }
        const id = Number(parametrosRuta.id);
        // Validador
        const tiendaUpdateDto = this.asignarValidadorActualizar(parametrosCuerpo, id);
        try {
            const errores: ValidationError[] = await validate(tiendaUpdateDto);
            if(errores.length > 0){
                console.log(errores);
                
                const mensajeError = 'Error en campos'
                const camposError = `&nombre=${tiendaUpdateDto.nombre}&ubicacion=${tiendaUpdateDto.ubicacion}&tipo=${tiendaUpdateDto.tipo}&responsable=${tiendaUpdateDto.responsable}&dinero=${tiendaUpdateDto.dinero}`;

                return res.redirect('/tienda/vista/crear?error=' + mensajeError + camposError);
            } else {
                // Craer tienda actualizar
                const actualizarTienda = this.crearInstanciaActualizar(tiendaUpdateDto);
                await this.tiendaService.editarUno(actualizarTienda);
                return res.redirect("/tienda/vista/inicio?mensaje=Tienda editada");
            }
        } catch (error) {
            console.log(error);
            return res.redirect("/tienda/vista/inicio?mensaje=Error eliminando tienda");
        }
    }

    @Post("vista/eliminar/:id")
    async eliminarDesdeVista(
        @Param() parametrosRuta,
        @Res() res,
        @Session() session
    ){
        if(!session.usuario){
            return res.redirect("/login");
        }
        try {
            const id = Number(parametrosRuta.id);
            await this.tiendaService.eliminarUno(id);
            return res.redirect("/tienda/vista/inicio?mensaje=Usuario eliminado");
        } catch (error) {
            console.log(error);
            return res.redirect("/tienda/vista/inicio?mensaje=Error eliminando tienda");
        }
    }


    asignarValidadorCrear(parametrosCuerpo): TiendaCreateDto{
        const tiendaCreateDto = new TiendaCreateDto(); 
        // Datos
        tiendaCreateDto.nombre = parametrosCuerpo.nombre
        tiendaCreateDto.ruc = parametrosCuerpo.ruc;
        tiendaCreateDto.ubicacion = parametrosCuerpo.ubicacion;
        tiendaCreateDto.tipo = parametrosCuerpo.tipo;
        tiendaCreateDto.responsable = parametrosCuerpo.responsable;
        tiendaCreateDto.dinero = Number(parametrosCuerpo.dinero);

        return tiendaCreateDto; 
    }

    asignarValidadorActualizar(parametrosCuerpo, id): TiendaUpdateDto{    
        if(id === NaN || id === null){
            throw new BadRequestException({mensaje: "Error en ruta"});
        }
        const tiendaUpdateDto = new TiendaUpdateDto();
        // Datos
        tiendaUpdateDto.id = id;
        tiendaUpdateDto.nombre = parametrosCuerpo.nombre;
        tiendaUpdateDto.ubicacion = parametrosCuerpo.ubicacion;
        tiendaUpdateDto.tipo = parametrosCuerpo.tipo;
        tiendaUpdateDto.responsable = parametrosCuerpo.responsable;
        tiendaUpdateDto.dinero = Number(parametrosCuerpo.dinero);
        
        return tiendaUpdateDto;
    }

    crearInstanciaNueva(tiendaCreateDto: TiendaCreateDto): TiendaEntity{
        // Crear nueva instancia
        const nuevaTienda = new TiendaEntity();
        nuevaTienda.nombre = tiendaCreateDto.nombre;
        nuevaTienda.ruc = tiendaCreateDto.ruc;
        nuevaTienda.ubicacion = tiendaCreateDto.ubicacion;
        nuevaTienda.tipo = tiendaCreateDto.tipo;
        nuevaTienda.responsable = tiendaCreateDto.responsable;
        nuevaTienda.dinero = tiendaCreateDto.dinero;
        
        return nuevaTienda;
    }

    crearInstanciaActualizar(tiendaUpdateDto: TiendaUpdateDto): TiendaEntity{
        // Craer tienda actualizar
        const actualizarTienda = new TiendaEntity();
        actualizarTienda.id = tiendaUpdateDto.id;
        actualizarTienda.nombre = tiendaUpdateDto.nombre;
        actualizarTienda.ubicacion = tiendaUpdateDto.ubicacion;
        actualizarTienda.tipo = tiendaUpdateDto.tipo;
        actualizarTienda.responsable = tiendaUpdateDto.responsable;
        actualizarTienda.dinero = tiendaUpdateDto.dinero;

        return actualizarTienda;
    }
}

