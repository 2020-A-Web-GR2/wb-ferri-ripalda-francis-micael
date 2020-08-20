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
        try{
            // Validacion con DTO
            const respuesta = await this._usuarioService.crearUno(parametrosDeCuerpo)
            return respuesta
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
        const  usuarioEditado = parametrosCuerpo;
        usuarioEditado.id = id;
        try{
            const respuesta = await this._usuarioService
                .editarUno(usuarioEditado)
            return  respuesta;
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
            "ejemplo", // Nombre de la vista
            {// parametros de la vista
                nombre: nombreControlador
            }
        )
    }


}

