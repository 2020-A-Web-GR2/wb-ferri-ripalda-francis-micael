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
    Query
} from "@nestjs/common";

@Controller("calculadora-http")
export class HttpCalculadoraController{

    // SUMA
    @Get("suma-query-headers") // HEADERS
    @HttpCode(200)
    sumar_query_headers(
        @Query() parametrosDeConsulta,
        @Headers() parametrosDeCabecera
    ){
        const n1 = Number(parametrosDeConsulta.n1);
        const n2 = Number(parametrosDeCabecera.n2);
        if(this.comprobarNumeros(n1, n2))
            return n1 + n2;
    }

    @Get("suma-query-ruta/:n2") // RUTA
    @HttpCode(200)
    sumar_query_ruta(
        @Query() parametrosDeConsulta,
        @Param() parametrosRuta
    ){
        const n1= Number(parametrosDeConsulta.n1);
        const n2 = Number(parametrosRuta.n2);
        if(this.comprobarNumeros(n1, n2))
            return n1 + n2;
    }

    @Get("suma-query-query") // QUERY
    @HttpCode(200)
    sumar_query_query(
        @Query() parametrosDeConsulta
    ){
        const n1 = Number(parametrosDeConsulta.n1);
        const n2 = Number(parametrosDeConsulta.n2);
        if(this.comprobarNumeros(n1, n2))
            return n1 + n2;
    }

    // RESTA
    @Put("resta-body-headers") // HEADERS
    @HttpCode(201)
    restar_body_headers(
        @Body() parametrosDeCuerpo,
        @Headers() parametrosDeCabecera
    ){
        let n1 = Number(parametrosDeCuerpo.n1);
        let n2 = Number(parametrosDeCabecera.n2);
        if(this.comprobarNumeros(n1, n2))
            return n1 - n2;
    }

    @Put("resta-body-ruta/:n2") //RUTA
    @HttpCode(201)
    restar_body_ruta(
        @Body() parametrosDeCuerpo,
        @Param() parametrosRuta
    ){
        let n1 = Number(parametrosDeCuerpo.n1);
        let n2 = Number(parametrosRuta.n2);
        if(this.comprobarNumeros(n1, n2))
            return n1 - n2;
    }

    @Put("resta-body-query") //QUERY
    @HttpCode(201)
    resta_body_query(
        @Body() parametrosDeCuerpo,
        @Query() parametrosDeConsulta
    ){
        let n1 = Number(parametrosDeCuerpo.n1);
        let n2 = Number(parametrosDeConsulta.n2);
        if(this.comprobarNumeros(n1, n2))
            return n1 - n2;
    }

    @Put("resta-body-body") //BODY
    @HttpCode(201)
    resta_body_body(
        @Body() parametrosDeCuerpo
    ){
        let n1 = Number(parametrosDeCuerpo.n1);
        let n2 = Number(parametrosDeCuerpo.n2);
        if(this.comprobarNumeros(n1, n2))
            return n1 - n2;
    }

    // MULTIPLICACION
    @Delete("multiplicacion-headers-headers") // HEADERS
    @HttpCode(200)
    multiplicacion_headers_headers(
        @Headers() parametrosDeCabecera
    ){
        let n1 = Number(parametrosDeCabecera.n1);
        let n2 = Number(parametrosDeCabecera.n2);
        if(this.comprobarNumeros(n1, n2))
            return n1 * n2;
    }

    @Delete("multiplicacion-headers-ruta/:n2") // RUTA
    @HttpCode(200)
    multiplicacion_headers_ruta(
        @Headers() parametrosDeCabecera,
        @Param() parametrosRuta
    ){
        let n1 = Number(parametrosDeCabecera.n1);
        let n2 = Number(parametrosRuta.n2);
        if(this.comprobarNumeros(n1, n2))
            return n1 * n2;
    }

    @Delete("multiplicacion-headers-query") // QUERY
    @HttpCode(200)
    multiplicacion_headers_query(
        @Headers() parametrosDeCabecera,
        @Query() parametrosDeConsulta
    ){
        let n1 = Number(parametrosDeCabecera.n1);
        let n2 = Number(parametrosDeConsulta.n2);
        if(this.comprobarNumeros(n1, n2))
            return n1 * n2;
    }

    @Delete("multiplicacion-headers-body") // BODY
    @HttpCode(200)
    multiplicacion_headers_body(
        @Headers() parametrosDeCabecera,
        @Body() parametrosDeCuerpo
    ){
        let n1 = Number(parametrosDeCabecera.n1);
        let n2 = Number(parametrosDeCuerpo.n2);
        if(this.comprobarNumeros(n1, n2))
            return n1 * n2;
    }

    // DIVISION
    @Post("division-ruta-headers/:n1") // HEADERS
    @HttpCode(201)
    division_ruta_headers(
        @Param() parametrosRuta,
        @Headers() parametrosDeCabecera
    ){
        let n1 = Number(parametrosRuta.n1);
        let n2 = Number(parametrosDeCabecera.n2);
        if (this.comprobarDivision(n1, n2))
            return n1 / n2;
    }

    @Post("division-ruta-ruta/:n1/:n2") //RUTA
    @HttpCode(201)
    division_ruta_ruta(
        @Param() parametrosRuta
    ){
        let n1 = Number(parametrosRuta.n1);
        let n2 = Number(parametrosRuta.n2);
        if (this.comprobarDivision(n1, n2))
            return n1 / n2;
    }

    @Post("division-ruta-query/:n1") // QUERY
    @HttpCode(201)
    division_ruta_query(
        @Param() parametrosRuta,
        @Query() parametrosDeConsulta
    ){
        let n1 = Number(parametrosRuta.n1);
        let n2 = Number(parametrosDeConsulta.n2);
        if (this.comprobarDivision(n1, n2))
            return n1 / n2;
    }

    @Post("division-ruta-body/:n1") // BODY
    @HttpCode(201)
    division_ruta_body(
        @Param() parametrosRuta,
        @Body() parametrosDeCuerpo
    ){
        let n1 = Number(parametrosRuta.n1);
        let n2 = Number(parametrosDeCuerpo.n2);
        if (this.comprobarDivision(n1, n2))
            return n1 / n2;
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
}