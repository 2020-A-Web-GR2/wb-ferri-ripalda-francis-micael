import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Header,
    HttpCode,
    Param,
    Post,
    Query,
    Req, Res
} from "@nestjs/common";
import {MascotaCreateDto} from "./dto/mascota.create-dto";
import {validate, ValidationError} from "class-validator";

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
    @HttpCode(200)
    async parametrosCuerpo(
        @Body() parametrosDeCuerpo
    ){
        // Promesas
        let mascotavalida = new MascotaCreateDto();
        mascotavalida.casada = parametrosDeCuerpo.casada;
        mascotavalida.edad = parametrosDeCuerpo.edad;
        mascotavalida.ligada = parametrosDeCuerpo.ligada;
        mascotavalida.nombre = parametrosDeCuerpo.nombre;
        mascotavalida.peso = parametrosDeCuerpo.peso;
        try{
            const errores: ValidationError[] = await validate(mascotavalida);
            if(errores.length>0){
                console.error("Errrores", errores);
                throw new BadRequestException("Error Validando");
            } else {
                const mensajeCorrecto = {
                    mensaje : "Se creo correctamente"
                }
                return  mensajeCorrecto;
            }
        } catch(e){
            console.error("Error", e);
            throw  new BadRequestException("Error validando");
        }
        //console.log("parametros de cuerpo", parametrosDeCuerpo);
        //return "registro creado";
    }

    @Get("guardarCookieInsegura")
    guardarCookieInsegura(
        @Query() parametrosConsulta,
        @Req() req, // peticion
        @Res() res // Respuesta
    ){
        res.cookie(
            "galletaInsegura",
            "Tengo hambre"
        );
        const  mensaje = {
            mensaje: "ok"
        };
        // return mensake // NO SE PUEDE UTILIZAR RETURN CUANDO SE USA @Res
        res.send(mensaje);
    }
    // 1 Guardar cookie segura
    // 2 Guardar cookie insegura
    // 3 Mostrar Cookies
}