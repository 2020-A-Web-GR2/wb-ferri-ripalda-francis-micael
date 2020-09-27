import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TiendaModule } from './tienda/tienda.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiendaEntity } from './tienda/tienda.entity';


@Module({
  imports: [
    TiendaModule,
    TypeOrmModule.forRoot(
      {
        name: "default",
        type: "mysql",
        host: "34.121.130.26",
        port: 5003,
        username: "root",
        password: "12345678",
        database: 'tienda',
        entities: [TiendaEntity],
        synchronize: true,
        dropSchema: false
      }
    )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
