import {BadRequestException, Controller, Delete, Get, Header, HttpCode, Param, Post} from "@nestjs/common";

// http_//localhost:3001/juegos-http
// /juegos-http
@ Controller('juegos-http')
export class HttpJuegoController{
    @Get('hola')
    @HttpCode(201)
    hola(){
        throw new BadRequestException('No envia nada')
        //return "Hola GET! :)"
    }

    @Post('hola')
    @HttpCode(202)
    holaPost(){
        return "Hola POST! :)"
    }

    @Delete('hola')
    @HttpCode(204)
    @Header('Cache-control', 'none')
    @Header('EPN', 'probando las cosas')
    holaDelete(){
        return "Hola DELETE! :)"
    }

    @Get('/parametros-ruta/:edad/gestion/:altura')
    parametrosRutaEjemplo(
        @Param() paremetrosRuta
    ){
        console.log("Parametros",paremetrosRuta);
        const edad = Number(paremetrosRuta.edad);
        const altura = Number(paremetrosRuta.altura);
        if (isNaN(edad) || isNaN(altura)){
            throw new BadRequestException("No son numeros")
        } else{
            return edad + altura;
        }
    }
}