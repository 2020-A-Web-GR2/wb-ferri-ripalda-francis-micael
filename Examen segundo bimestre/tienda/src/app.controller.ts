import { Body, Controller, Get, Post, Req, Res, Session } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("login")
  login(
    @Res() res
  ){
    return res.render("login/login");
  }

  @Post("login")
  loginPost(
    @Body() parametrosCuerpo,
    @Res() res,
    @Session() session
  ){
    // validamos los datos
    const autenticado = this.autenticarUsuario(parametrosCuerpo);
    if(autenticado){
      session.usuario = parametrosCuerpo.usuario;
      return res.redirect("tienda/vista/inicio");
    } else {
      return res.render(
        "login/login", 
        {error: "El usuario o la contraseña mo coinciden"}
      );
    }
  }

  @Get("cuenta")
  cuenta(
    @Res() res,
    @Session() session
  ){
    const estaLogueado = session.usuario;
    if(estaLogueado){
      return res.render("login/cuenta", {usuario: session.usuario});
    } else {
      return res.redirect("/login");
    }
  }

  @Get("logout")
  logout(
    @Session() session,
    @Res() res,
    @Req() req
  ){
    session.usuario = undefined;
    req.session.destroy();
    return res.redirect("login");
  }

  autenticarUsuario(parametrosCuerpo): boolean{
    const usuario = parametrosCuerpo.usuario;
    const password = parametrosCuerpo.password;
    if(usuario == "Adrian" && password == "1234"){
      return true;
    }
    return false;
  }

}
