import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException, NotFoundException,
    Param,
    Post,
    Put
} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";

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
        private readonly _usuarioService: UsuarioService
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
    editarUno(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo
    ){
        const indice = this.arregloUsuario.findIndex(
            (usuario) => usuario.id === Number(parametrosRuta.id)
        );
        this.arregloUsuario[indice].nombre = parametrosCuerpo.nombre;
        return this.arregloUsuario[indice];
    }

    @Delete(":id")
    eliminarUno(
        @Param() parametrosRuta
    ){
        const indice = this.arregloUsuario.findIndex(
            (usuario) => usuario.id === Number(parametrosRuta.id)
        );
        this.arregloUsuario.splice(indice, 1);
        return {mensaje: "Se ha borrado el usuario con indice: "+ indice};
    }


}