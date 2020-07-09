import {BadRequestException, Body, Controller, Delete, Get, Header, HttpCode, Param, Post, Query} from "@nestjs/common";

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

    @Get('/parametros-consulta')
    parametrosConsulta(
        @Query() parametrosDeConsulta
    ){
        console.log('parametrosDeConsulta',parametrosDeConsulta);
        const nombre = String(parametrosDeConsulta.nombre);
        const apellido = String(parametrosDeConsulta.apellido);
        //const tieneNombreApellido = parametrosDeConsulta.nombre && parametrosDeConsulta.apellido
        if(nombre && apellido){
            return `${nombre} ${apellido}`;
        } else {
            return "=)";
        }
    }

    @Post('parametros-cuerpo')
    parametrosCuerpo(
        @Body() parametrosDeCuerpo
    ){
        console.log("parametros de cuerpo", parametrosDeCuerpo);
        return "registro creado";
    }
}