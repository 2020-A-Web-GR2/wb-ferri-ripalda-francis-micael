import { Module } from "@nestjs/common";
import { TiendaController } from "./tienda.controller";
import { TiendaService } from './tienda.service';
import { TiendaEntity } from './tienda.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([TiendaEntity], "default")
    ],
    controllers: [
        TiendaController
    ],
    providers: [
        TiendaService
    ]
})
export class TiendaModule {

}