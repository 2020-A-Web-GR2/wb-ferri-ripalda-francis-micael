import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException, NotFoundException,
    Param,
    Post,
    Put, Res
} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {MascotaService} from "../mascota/mascota.service";
import { UsuarioCreateDto } from "./dto/usuario.create.dto";
import { ValidationError, validate } from "class-validator";
import { UsuarioUpdateDto } from './dto/usuario.update.dto';

@Controller("usuario")
export class UsuarioController{
    // public palabra opcional
    public arregloUsuario = [
        {
            id: 0,
            nombre: "Francis"
        },
        {
            id: 1,
            nombre: "Micael"
        },
        {
            id: 2,
            nombre: "Alberto"
        }
    ];
    public idActual = 3;

    constructor(
        private readonly _usuarioService: UsuarioService,
        private readonly _mascotaService: MascotaService
    ) {
    }
    @Get()
    async mostrarTodas(){
        try{
            const respuesta = await this._usuarioService.buscarTodos()
            return respuesta;
        } catch (e){
            console.log(e)
            throw new InternalServerErrorException({
            mensaje: "Error del servidor"
            })
        }
    }

    @Post()
    async crearUno(
        @Body() parametrosDeCuerpo
    ){
        // Validacion con DTO Create
        let usuarioValido = new UsuarioCreateDto();
        usuarioValido.nombre = parametrosDeCuerpo.nombre;
        usuarioValido.apellido = parametrosDeCuerpo.apellido;
        usuarioValido.cedula = parametrosDeCuerpo.cedula;
        usuarioValido.sueldo = parametrosDeCuerpo.sueldo;
        usuarioValido.fechaNacimiento = parametrosDeCuerpo.fechaNacimiento;
        usuarioValido.fechaHoraNacimiento = parametrosDeCuerpo.fechaHoraNacimiento;

        try{
            const errores: ValidationError[] = await validate(usuarioValido);
            if(errores.length>0){
                console.error("Errrores", errores);
                throw new BadRequestException("Error Validando");
            } else {
                let respuesta = await this._usuarioService.crearUno(parametrosDeCuerpo)
                // return respuesta
                const mensajeCorrecto = {
                    mensaje : "Se creo correctamente"
                }
                return  mensajeCorrecto;
            }
        } catch(e){
            console.error(e)
            throw new BadRequestException({
                mensaje: "Error validadndo datos"
            });
        }
        /*const nuevoUsuario = {
            id: this.idActual + 1,
            nombre: parametrosDeCuerpo.nombre
        };
        this.arregloUsuario.push(nuevoUsuario);
        this.idActual = this.idActual + 1;
        return nuevoUsuario;
         */
    }
    // Ver uno
    @Get(':id')
    async verUno(
        @Param() paraetrosDeRuta
    ){
        let respuesta;
        try{
            respuesta = await this._usuarioService
                .buscarUno(Number(paraetrosDeRuta.id))
        } catch (e){
            console.log(e)
            throw new InternalServerErrorException({
                mensaje: "Error del servidor"
            })
        }
        if (respuesta){
            return  respuesta;
        } else {
            throw  new NotFoundException({
                mensaje: "No existen registros"
            })
        }
        /*
        const indice = this.arregloUsuario.findIndex(
            (usuario) => usuario.id === Number(paraetrosDeRuta.id)
        );
        return this.arregloUsuario[indice];

         */
    }
    @Put(":id")
    async editarUno(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo
    ){
        const id = Number(parametrosRuta.id);
        parametrosCuerpo.id = id

        // Validacion con DTO Update
        let usuarioValido = new UsuarioUpdateDto();
        usuarioValido.id =  parametrosCuerpo.id = id
        usuarioValido.nombre = parametrosCuerpo.nombre
        usuarioValido.apellido = parametrosCuerpo.apellido
        usuarioValido.sueldo = parametrosCuerpo.sueldo
        usuarioValido.fechaNacimiento = parametrosCuerpo.fechaNacimiento
        usuarioValido.fechaHoraNacimiento = parametrosCuerpo.fechaHoraNacimiento

        try{
            const errores: ValidationError[] = await validate(usuarioValido)
            if(errores.length > 0){
                console.error("Errrores", errores);
                throw new BadRequestException("Error validando campos");
            } else {
                const respuesta = await this._usuarioService
                    .editarUno(parametrosCuerpo)
                //return  respuesta;
                const mensajeCorrecto = {
                    mensaje : "Se modifico correctamente"
                }
                return  mensajeCorrecto;
            }
            
        } catch (e){
            console.error(e)
            throw new InternalServerErrorException({
                mensaje: "Error del servidor"
            })
        }
    }

    @Delete(":id")
    async eliminarUno(
        @Param() parametrosRuta
    ){
        const id = Number(parametrosRuta.id);
        try{
            const respuesta = await this._usuarioService
                .eliminarUno(id)
            return  {
                mensaje: "Regstro con id: " + id + " eliminado"
            };
        } catch (e){
            console.log(e)
            throw new InternalServerErrorException({
                mensaje: "Error del servidor"
            })
        }
        /*
        const indice = this.arregloUsuario.findIndex(
            (usuario) => usuario.id === Number(parametrosRuta.id)
        );
        this.arregloUsuario.splice(indice, 1);
        return {mensaje: "Se ha borrado el usuario con indice: "+ indice};

         */
    }
    @Post("crearUsuarioYCrearMascota")
    async crearUsuarioYCrearMascota(
        @Body() parametrosCuerpo
    ){
        const usuario = parametrosCuerpo.usuario;
        const mascota = parametrosCuerpo.mascota;
        // Validadr usuario
        // Validar mascota
        let usuarioCreado;
        try {
            usuarioCreado = await this._usuarioService.crearUno(usuario);
        } catch(e) {
            console.error(e)
            throw new InternalServerErrorException({
                mensaje: "Error creando usuario"
            })
        }
        if (usuarioCreado) {
            mascota.usuario = usuarioCreado.id;
            let mascotaCreada;
            try {
                mascotaCreada = await this._mascotaService.crearNuevaMascota(mascota)
            } catch (e) {
                console.error(e)
                throw new InternalServerErrorException({
                    mensaje: "Error creando usuaio"
                })
            }
            if (mascotaCreada) {
                return {
                    mascota: mascotaCreada,
                    usuario: usuarioCreado
                }
            } else {
                throw new InternalServerErrorException({
                    mensaje: "Error creando mascota"
                })
            }
        } else {
            throw new InternalServerErrorException({
                mensaje: "Error creando usuario"
            })
        }

    }

    @Get("vista/usuario")
    vistaUsuario(
        @Res() res
    ){
        const nombreControlador = "Francis"
        res.render(
            "usuario/ejemplo", // Nombre de la vista
            {// parametros de la vista
                nombre: nombreControlador
            }
        )
    }

    @Get("vista/faq")
    faq(
        @Res() res
    ){
        res.render("usuario/faq")
    }

    @Get("vista/inicio")
    inicio(
        @Res() res
    ){
        res.render("usuario/inicio")
    }

    @Get("vista/login")
    login(
        @Res() res
    ){
        res.render("usuario/login")
    }

    


}

