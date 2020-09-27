import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    login(res: any): any;
    loginPost(parametrosCuerpo: any, res: any, session: any): any;
    cuenta(res: any, session: any): any;
    logout(session: any, res: any, req: any): any;
    autenticarUsuario(parametrosCuerpo: any): boolean;
}
