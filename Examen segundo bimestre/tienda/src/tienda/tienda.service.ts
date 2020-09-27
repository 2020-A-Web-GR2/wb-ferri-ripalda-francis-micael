import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { TiendaEntity } from './tienda.entity';
import { Repository, FindManyOptions, Like } from 'typeorm';

@Injectable()
export class TiendaService {
    constructor(
        @InjectRepository(TiendaEntity)
        private repository: Repository<TiendaEntity>
    ){}

    crearUno(tienda: TiendaEntity){
        return this.repository.save(tienda);
    }

    buscarTodos(textoConsulta?: string){
        let consulta: FindManyOptions<TiendaEntity> = {};
        if(textoConsulta){
            consulta= {
                where: [
                    {
                        nombre: Like(`%${textoConsulta}%`)
                    },
                    {
                        ruc: Like(`%${textoConsulta}%`)
                    }
                ]
            }
        }
        return this.repository.find(consulta);
    }

    buscarUno(id: number){
        return this.repository.findOne(id);
    }

    editarUno(tienda: TiendaEntity){
        return this.repository.save(tienda);
    }

    eliminarUno(id: number){
        return this.repository.delete(id);
    }
}