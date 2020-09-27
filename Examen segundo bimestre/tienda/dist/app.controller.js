"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
    login(res) {
        return res.render("login/login");
    }
    loginPost(parametrosCuerpo, res, session) {
        const autenticado = this.autenticarUsuario(parametrosCuerpo);
        if (autenticado) {
            session.usuario = parametrosCuerpo.usuario;
            return res.redirect("tienda/vista/inicio");
        }
        else {
            return res.render("login/login", { error: "El usuario o la contraseña mo coinciden" });
        }
    }
    cuenta(res, session) {
        const estaLogueado = session.usuario;
        if (estaLogueado) {
            return res.render("login/cuenta", { usuario: session.usuario });
        }
        else {
            return res.redirect("/login");
        }
    }
    logout(session, res, req) {
        session.usuario = undefined;
        req.session.destroy();
        return res.redirect("login");
    }
    autenticarUsuario(parametrosCuerpo) {
        const usuario = parametrosCuerpo.usuario;
        const password = parametrosCuerpo.password;
        if (usuario == "Adrian" && password == "1234") {
            return true;
        }
        return false;
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    common_1.Get("login"),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "login", null);
__decorate([
    common_1.Post("login"),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __param(2, common_1.Session()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "loginPost", null);
__decorate([
    common_1.Get("cuenta"),
    __param(0, common_1.Res()),
    __param(1, common_1.Session()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "cuenta", null);
__decorate([
    common_1.Get("logout"),
    __param(0, common_1.Session()),
    __param(1, common_1.Res()),
    __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "logout", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map