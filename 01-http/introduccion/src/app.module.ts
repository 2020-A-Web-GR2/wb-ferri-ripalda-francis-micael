import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/http-juego.module";

@Module({
  imports: [
        HttpJuegoModule
      // Aqui otros modulos
  ],
  controllers: [
      // Controladores del APP Module
      AppController
  ],
  providers: [
      // Servicios APP Module
      AppService
  ],
})
export class AppModule {}
