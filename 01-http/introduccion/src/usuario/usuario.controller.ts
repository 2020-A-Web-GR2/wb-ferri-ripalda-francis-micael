import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";

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

    @Get()
    mostrarTodas(){
        return this.arregloUsuario;
    }

    @Post()
    crearUno(
        @Body() parametrosDeCuerpo
    ){
        const nuevoUsuario = {
            id: this.idActual + 1,
            nombre: parametrosDeCuerpo.nombre
        };
        this.arregloUsuario.push(nuevoUsuario);
        this.idActual = this.idActual + 1;
        return nuevoUsuario;
    }
    // Ver uno
    @Get(':id')
    verUno(
        @Param() paraetrosDeRuta
    ){
        const indice = this.arregloUsuario.findIndex(
            (usuario) => usuario.id === Number(paraetrosDeRuta.id)
        );
        return this.arregloUsuario[indice];
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