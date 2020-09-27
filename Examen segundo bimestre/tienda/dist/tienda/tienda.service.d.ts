import { TiendaEntity } from './tienda.entity';
import { Repository } from 'typeorm';
export declare class TiendaService {
    private repository;
    constructor(repository: Repository<TiendaEntity>);
    crearUno(tienda: TiendaEntity): Promise<TiendaEntity>;
    buscarTodos(textoConsulta?: string): Promise<TiendaEntity[]>;
    buscarUno(id: number): Promise<TiendaEntity>;
    editarUno(tienda: TiendaEntity): Promise<TiendaEntity>;
    eliminarUno(id: number): Promise<import("typeorm").DeleteResult>;
}
