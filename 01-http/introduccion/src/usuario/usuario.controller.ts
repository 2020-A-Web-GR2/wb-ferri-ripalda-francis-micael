import {Body, Controller, Get, Param, Post} from "@nestjs/common";

@Controller("usuario")
export class UsuarioController{
    // public palabra opcional
    public arregloUsuario = [
        {
            id: 1,
            nombre: "Francis"
        },
        {
            id: 2,
            nombre: "Micael"
        },
        {
            id: 3,
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
}