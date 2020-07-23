import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpCalculadoraModule} from "./http/http-calculadora.module";

@Module({
  imports: [
      HttpCalculadoraModule
  ],
  controllers: [
      AppController
  ],
  providers: [
      AppService
  ],
})
export class AppModule {}
