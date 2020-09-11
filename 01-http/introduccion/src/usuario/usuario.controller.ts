import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException, NotFoundException,
    Param,
    Post,
    Put, Res, Query
} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {MascotaService} from "../mascota/mascota.service";
import { UsuarioCreateDto } from "./dto/usuario.create.dto";
import { ValidationError, validate } from "class-validator";
import { UsuarioUpdateDto } from './dto/usuario.update.dto';
import { UsuarioEntity } from './usuario.entity';

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
        return res.render(
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
    async inicio(
        @Res() res,
        @Query() parametrosConsulta
    ){
        let resultadoEncontrado
        try {
            resultadoEncontrado = await this._usuarioService.buscarTodos(parametrosConsulta.busqueda);
        } catch (error){
            throw new InternalServerErrorException("Error encontrando usuarios")
        }
        if (resultadoEncontrado){
            return res.render(
                "usuario/inicio",
                { arregloUsuarios: resultadoEncontrado,
                    parametrosConsulta: parametrosConsulta
                }
            )
        } else {
            throw new NotFoundException("No se encontraron usuarios")
        }
    }

    @Get("vista/login")
    login(
        @Res() res
    ){
        return res.render("usuario/login")
    }
    
    @Get('vista/crear') // Controlador
    crearUsuarioVista(
        @Query() parametrosConsulta,
        @Res() res
    ) {
        return res.render(
            'usuario/crear',
            {
                error: parametrosConsulta.error,
                nombre: parametrosConsulta.nombre,
                apellido: parametrosConsulta.apellido,
                cedula: parametrosConsulta.cedula
            }
        )
    }

    @Get('vista/editar/:id') // Controlador
    async editarUsuarioVista(
        @Query() parametrosConsulta,
        @Param() parametrosRuta,
        @Res() res
    ) {
        const id = Number(parametrosRuta.id);
        let usuarioEncontrado;
        try {
            usuarioEncontrado = await this._usuarioService.buscarUno(id)
        } catch (error) {
            console.log("Error del servidor");
            return res.redirect("/usuario/vista/inicio?mensaje=Errror buscando usuario")
        }
        if(usuarioEncontrado){
            return res.render(
                'usuario/crear',
                {
                    error: parametrosConsulta.error,
                    usuario: usuarioEncontrado
                }
            )
        } else {
            return res.redirect("/usuario/vista/inicio?mensaje=Usuario no encontrado")
        }
        
    }


    @Post('crearDesdeVista')
    async crearDesdeVista(
        @Body() parametrosCuerpo,
        @Res() res,
        ) {
            // Validar los datos con un rico DTO
            let nombreApellidoConsulta;
            let cedulaConsulta;
            if (parametrosCuerpo.cedula && parametrosCuerpo.nombre && parametrosCuerpo.apellido) {
                nombreApellidoConsulta = `&nombre=${parametrosCuerpo.nombre}&apellido=${parametrosCuerpo.apellido}`
                if (parametrosCuerpo.cedula.length === 10) {
                    cedulaConsulta = `&cedula=${parametrosCuerpo.cedula}`
                } else {
                    const mensajeError = 'Cedula incorrecta'
                    return res.redirect('/usuario/vista/crear?error=' + mensajeError + nombreApellidoConsulta)
                }
            } else {
                const mensajeError = 'Enviar cedula(10) nombre y apellido'
                return res.redirect('/usuario/vista/crear?error=' + mensajeError)
            }
            let respuestaCreacionUsuario;
            try {
                respuestaCreacionUsuario = await this._usuarioService.crearUno(parametrosCuerpo);
            } catch (error) {
                console.error(error);
                const mensajeError = 'Error creando usuario'
                return res.redirect('/usuario/vista/crear?error=' + mensajeError + nombreApellidoConsulta + cedulaConsulta)
            }
            if (respuestaCreacionUsuario) {
                return res.redirect('/usuario/vista/inicio');
            } else {
                const mensajeError = 'Error creando usuario'
                return res.redirect('/usuario/vista/crear?error=' + mensajeError + nombreApellidoConsulta + cedulaConsulta);
            }
        }
    
    @Post("editarDesdeVista/:id")
    async editarDesdeVista(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo,
        @Res() res
    ){
        const usuarioEditado = {
            id: Number(parametrosRuta.id),
            nombre: parametrosCuerpo.nombre,
            apellido: parametrosCuerpo.apellido
            // cedula: parametrosCuerpo.cedula
        } as UsuarioEntity
        try {
            await this._usuarioService.editarUno(usuarioEditado);
            return res.redirect("/usuario/vista/inicio?mensaje=Usuario editado")
        } catch (error) {
            console.log(error);
            return res.redirect("/usuario/vista/inicio?mensaje=Error eliminando usuario");
        }
    }

    @Post("eliminarDesdeVista/:id")
    async eliminarDesdeVista(
        @Param() parametrosRuta,
        @Res() res
    ){
        try {
            const id = Number(parametrosRuta.id)
            await this._usuarioService.eliminarUno(id)
            return res.redirect("/usuario/vista/inicio?mensaje=Usuario eliminado")
        } catch (error) {
            console.log(error);
            return res.redirect("/usuario/vista/inicio?mensaje=Error eliminando usuario");
        }
    }
}


