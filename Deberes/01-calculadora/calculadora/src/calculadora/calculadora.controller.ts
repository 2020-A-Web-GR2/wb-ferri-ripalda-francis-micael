import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Headers,
    HttpCode,
    Param,
    Post,
    Put,
    Query, Req, Res
} from "@nestjs/common";

@Controller("calculadora")
export class CalculadoraController{

    private errorUsuario: string = "Su usuario no pudo ser agregado";
    private sinUsuario: string = "No ha ingresado su usuario aún";
    private sinPuntaje: string = "No ha pudo reuperar su puntaje";
    private reinicio: string = ", haz terminado tus puntos, se te han restablecido de nuevo";
    private puntosTerminados: string = "Se reinician los puntos a 100";
    private usuarioGuardado: string = "Se ha guardado el usuario ";

    // NOMBRE DE USUARIO
    // Guardar cookie inseguro y no firmada
    @Get("/")
    guardarUsuario(
        @Query() parametrosConsulta,
        @Res() res
    ){
        const usuario: string = parametrosConsulta.usuario;
        if(usuario){
            res.cookie(
                "usuario", usuario
            );
            res.cookie(
                "puntos", 100,
                {signed: true}
            );
            res.send({mensaje: this.usuarioGuardado + usuario});
        } else {
            throw new BadRequestException(this.errorUsuario);
        }
    }

    // SUMA
    @Get("suma-query-headers") // HEADERS
    @HttpCode(200)
    sumar_query_headers(
        @Query() parametrosDeConsulta,
        @Headers() parametrosDeCabecera,
        @Req() req,
        @Res() res
    ){
        const nombre = req.cookies.usuario;
        if(nombre){
            let puntos = this.obtenerPuntos(req);
            const n1 = Number(parametrosDeConsulta.n1);
            const n2 = Number(parametrosDeCabecera.n2);
            if(this.comprobarNumeros(n1, n2)){
                this.enviarRespuesta( n1 + n2, puntos, nombre, res);
            }
        } else {
            throw new BadRequestException(this.sinUsuario);
        }
    }

    @Get("suma-query-ruta/:n2") // RUTA
    @HttpCode(200)
    sumar_query_ruta(
        @Query() parametrosDeConsulta,
        @Param() parametrosRuta,
        @Req() req,
        @Res() res
    ){
        const nombre = req.cookies.usuario;
        if(nombre){
            let puntos = this.obtenerPuntos(req);
            const n1= Number(parametrosDeConsulta.n1);
            const n2 = Number(parametrosRuta.n2);
            if(this.comprobarNumeros(n1, n2))
                this.enviarRespuesta( n1 + n2, puntos, nombre, res);
        } else {
            throw new BadRequestException(this.sinUsuario);
        }
    }

    @Get("suma-query-query") // QUERY
    @HttpCode(200)
    sumar_query_query(
        @Query() parametrosDeConsulta,
        @Req() req,
        @Res() res
    ){
        const nombre = req.cookies.usuario;
        if(nombre){
            let puntos = this.obtenerPuntos(req);
            const n1 = Number(parametrosDeConsulta.n1);
            const n2 = Number(parametrosDeConsulta.n2);
            if(this.comprobarNumeros(n1, n2))
                this.enviarRespuesta( n1 + n2, puntos, nombre, res);
        } else {
            throw new BadRequestException(this.sinUsuario);
        }
    }

    // RESTA
    @Put("resta-body-headers") // HEADERS
    @HttpCode(201)
    restar_body_headers(
        @Body() parametrosDeCuerpo,
        @Headers() parametrosDeCabecera,
        @Req() req,
        @Res() res
    ){
        const nombre = req.cookies.usuario;
        if(nombre){
            let puntos = this.obtenerPuntos(req);
            let n1 = Number(parametrosDeCuerpo.n1);
            let n2 = Number(parametrosDeCabecera.n2);
            if(this.comprobarNumeros(n1, n2))
                this.enviarRespuesta( n1 - n2, puntos, nombre, res);
        } else {
            throw new BadRequestException(this.sinUsuario);
        }
    }

    @Put("resta-body-ruta/:n2") //RUTA
    @HttpCode(201)
    restar_body_ruta(
        @Body() parametrosDeCuerpo,
        @Param() parametrosRuta,
        @Req() req,
        @Res() res
    ){
        const nombre = req.cookies.usuario;
        if(nombre){
            let puntos = this.obtenerPuntos(req);
            let n1 = Number(parametrosDeCuerpo.n1);
            let n2 = Number(parametrosRuta.n2);
            if(this.comprobarNumeros(n1, n2))
                this.enviarRespuesta( n1 - n2, puntos, nombre, res);
        } else {
            throw new BadRequestException(this.sinUsuario);
        }
    }

    @Put("resta-body-query") //QUERY
    @HttpCode(201)
    resta_body_query(
        @Body() parametrosDeCuerpo,
        @Query() parametrosDeConsulta,
        @Req() req,
        @Res() res
    ){
        const nombre = req.cookies.usuario;
        if(nombre){
            let puntos = this.obtenerPuntos(req);
            let n1 = Number(parametrosDeCuerpo.n1);
            let n2 = Number(parametrosDeConsulta.n2);
            if(this.comprobarNumeros(n1, n2))
                this.enviarRespuesta( n1 - n2, puntos, nombre, res);
        } else {
            throw new BadRequestException(this.sinUsuario);
        }
    }

    @Put("resta-body-body") //BODY
    @HttpCode(201)
    resta_body_body(
        @Body() parametrosDeCuerpo,
        @Req() req,
        @Res() res
    ){
        const nombre = req.cookies.usuario;
        if(nombre){
            let puntos = this.obtenerPuntos(req);
            let n1 = Number(parametrosDeCuerpo.n1);
            let n2 = Number(parametrosDeCuerpo.n2);
            if(this.comprobarNumeros(n1, n2))
                this.enviarRespuesta( n1 - n2, puntos, nombre, res);
        } else {
            throw new BadRequestException(this.sinUsuario);
        }
    }

    // MULTIPLICACION
    @Delete("multiplicacion-headers-headers") // HEADERS
    @HttpCode(200)
    multiplicacion_headers_headers(
        @Headers() parametrosDeCabecera,
        @Req() req,
        @Res() res
    ){
        const nombre = req.cookies.usuario;
        if(nombre){
            let puntos = this.obtenerPuntos(req);
            let n1 = Number(parametrosDeCabecera.n1);
            let n2 = Number(parametrosDeCabecera.n2);
            if(this.comprobarNumeros(n1, n2))
                this.enviarRespuesta( n1 * n2, puntos, nombre, res);
        } else {
            throw new BadRequestException(this.sinUsuario);
        }
    }

    @Delete("multiplicacion-headers-ruta/:n2") // RUTA
    @HttpCode(200)
    multiplicacion_headers_ruta(
        @Headers() parametrosDeCabecera,
        @Param() parametrosRuta,
        @Req() req,
        @Res() res
    ){
        const nombre = req.cookies.usuario;
        if(nombre){
            let puntos = this.obtenerPuntos(req);
            let n1 = Number(parametrosDeCabecera.n1);
            let n2 = Number(parametrosRuta.n2);
            if(this.comprobarNumeros(n1, n2))
                this.enviarRespuesta( n1 * n2, puntos, nombre, res);
        } else {
            throw new BadRequestException(this.sinUsuario);
        }
    }

    @Delete("multiplicacion-headers-query") // QUERY
    @HttpCode(200)
    multiplicacion_headers_query(
        @Headers() parametrosDeCabecera,
        @Query() parametrosDeConsulta,
        @Req() req,
        @Res() res
    ){
        const nombre = req.cookies.usuario;
        if(nombre){
            let puntos = this.obtenerPuntos(req);
            let n1 = Number(parametrosDeCabecera.n1);
            let n2 = Number(parametrosDeConsulta.n2);
            if(this.comprobarNumeros(n1, n2))
                this.enviarRespuesta( n1 * n2, puntos, nombre, res);
        } else {
            throw new BadRequestException(this.sinUsuario);
        }
    }

    @Delete("multiplicacion-headers-body") // BODY
    @HttpCode(200)
    multiplicacion_headers_body(
        @Headers() parametrosDeCabecera,
        @Body() parametrosDeCuerpo,
        @Req() req,
        @Res() res
    ){
        const nombre = req.cookies.usuario;
        if(nombre){
            let puntos = this.obtenerPuntos(req);
            let n1 = Number(parametrosDeCabecera.n1);
            let n2 = Number(parametrosDeCuerpo.n2);
            if(this.comprobarNumeros(n1, n2))
                this.enviarRespuesta( n1 * n2, puntos, nombre, res);
        } else {
            throw new BadRequestException(this.sinUsuario);
        }
    }

    // DIVISION
    @Post("division-ruta-headers/:n1") // HEADERS
    @HttpCode(201)
    division_ruta_headers(
        @Param() parametrosRuta,
        @Headers() parametrosDeCabecera,
        @Req() req,
        @Res() res
    ){
        const nombre = req.cookies.usuario;
        if(nombre){
            let puntos = this.obtenerPuntos(req);
            let n1 = Number(parametrosRuta.n1);
            let n2 = Number(parametrosDeCabecera.n2);
            if (this.comprobarDivision(n1, n2))
                this.enviarRespuesta( n1 / n2, puntos, nombre, res);
        } else {
            throw new BadRequestException(this.sinUsuario);
        }
    }

    @Post("division-ruta-ruta/:n1/:n2") //RUTA
    @HttpCode(201)
    division_ruta_ruta(
        @Param() parametrosRuta,
        @Req() req,
        @Res() res
    ){
        const nombre = req.cookies.usuario;
        if(nombre){
            let puntos = this.obtenerPuntos(req);
            let n1 = Number(parametrosRuta.n1);
            let n2 = Number(parametrosRuta.n2);
            if (this.comprobarDivision(n1, n2))
                this.enviarRespuesta( n1 / n2, puntos, nombre, res);
        } else {
            throw new BadRequestException(this.sinUsuario);
        }
    }

    @Post("division-ruta-query/:n1") // QUERY
    @HttpCode(201)
    division_ruta_query(
        @Param() parametrosRuta,
        @Query() parametrosDeConsulta,
        @Req() req,
        @Res() res
    ){
        const nombre = req.cookies.usuario;
        if(nombre){
            let puntos = this.obtenerPuntos(req);
            let n1 = Number(parametrosRuta.n1);
            let n2 = Number(parametrosDeConsulta.n2);
            if (this.comprobarDivision(n1, n2))
                this.enviarRespuesta( n1 / n2, puntos, nombre, res);
        } else {
            throw new BadRequestException(this.sinUsuario);
        }
    }

    @Post("division-ruta-body/:n1") // BODY
    @HttpCode(201)
    division_ruta_body(
        @Param() parametrosRuta,
        @Body() parametrosDeCuerpo,
        @Req() req,
        @Res() res
    ){
        const nombre = req.cookies.usuario;
        if(nombre){
            let puntos = this.obtenerPuntos(req);
            let n1 = Number(parametrosRuta.n1);
            let n2 = Number(parametrosDeCuerpo.n2);
            if (this.comprobarDivision(n1, n2))
                this.enviarRespuesta( n1 / n2, puntos, nombre, res);
        } else {
            throw new BadRequestException(this.sinUsuario);
        }
    }


    // METODOS AUXILIARES
    comprobarNumeros(n1, n2): boolean{
        if (isNaN(n1) || isNaN(n2)){
            throw new BadRequestException("No son numeros");
        } else{
            return true;
        }
    }

    comprobarDivision(n1, n2){
        if(this.comprobarNumeros(n1, n2))
            if(n2 !== 0)
                return true;
            else
                throw new BadRequestException("No existe division para 0 o vacio");
    }

    calcularPuntaje(resultado: number, puntos: number){
        let reinicio = false;
        let nuevo = puntos - Math.abs(resultado);
        console.log(`${puntos} - ${Math.abs(resultado)} = ${nuevo}`);
        if (nuevo <= 0){
            console.log(this.puntosTerminados);
            nuevo = 100;
            reinicio = true;
        }
        return [nuevo, reinicio];
    }

    enviarRespuesta(resultado: number, puntos: number , nombre: string, res){
        let respuesta = this.calcularPuntaje(resultado, puntos);
        let nuevosPuntos = respuesta[0];
        let mensaje;
        if (respuesta[1]){
            mensaje = { resultado: resultado, notificacion: nombre + this.reinicio}
        } else {
            mensaje = {resultado: resultado}
        }
        res.cookie("puntos", nuevosPuntos, {signed: true});
        res.send(mensaje);
    }

    private obtenerPuntos(req: any): number{
        let puntos: number = req.signedCookies.puntos;
        if(!puntos){
            throw new BadRequestException(this.sinPuntaje);
        }
        return puntos;
    }
}