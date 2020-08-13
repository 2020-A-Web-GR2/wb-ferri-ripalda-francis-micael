import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/http-juego.module";
import {UsuarioModule} from "./usuario/usuario.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario/usuario.entity";

@Module({
  imports: [
      HttpJuegoModule,
      UsuarioModule,
      TypeOrmModule
          .forRoot({
              name: "default", // nombre de la conexion
              type: 'mysql',  // mysql postgres
              host: '34.68.28.243', // ip
              port: 3306, // Puerto
              username: 'root', // usuario //TODO:
              password: 'root', // Contraseña //TODO:
              database: 'test', //Base de datos
              entities: [ // Todas las entidades
                  UsuarioEntity
              ],
              // NO SE RECOMIENDA UTILIZAR SINCRONIZE EN PRODUCION
              synchronize: true, // Actualiza el esquema de la base de datos
              dropSchema: false, // Eliminar datos y esquema de la base de datos
          }),
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
