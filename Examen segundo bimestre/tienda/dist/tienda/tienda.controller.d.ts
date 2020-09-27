import { TiendaService } from './tienda.service';
import { TiendaCreateDto } from './dto/tienda.create.dto';
import { TiendaEntity } from './tienda.entity';
import { TiendaUpdateDto } from './dto/tienda.update.dto';
export declare class TiendaController {
    private readonly tiendaService;
    constructor(tiendaService: TiendaService);
    mostrarTodos(): Promise<TiendaEntity[]>;
    verUno(parametrosRuta: any): Promise<TiendaEntity>;
    crearUno(parametrosCuerpo: any): Promise<TiendaEntity>;
    editarUno(parametrosRuta: any, parametrosCuerpo: any): Promise<TiendaEntity>;
    eliminarUno(parametrosRuta: any): Promise<import("typeorm").DeleteResult>;
    inicio(res: any, parametrosConsulta: any, session: any): Promise<any>;
    crearTiendaVista(parametrosConsulta: any, res: any, session: any): any;
    editarTiendaVista(parametrosConsulta: any, parametrosRuta: any, res: any, session: any): Promise<any>;
    crearDesdeVista(parametrosCuerpo: any, res: any, session: any): Promise<any>;
    editarDesdeVista(parametrosRuta: any, parametrosCuerpo: any, res: any, session: any): Promise<any>;
    eliminarDesdeVista(parametrosRuta: any, res: any, session: any): Promise<any>;
    asignarValidadorCrear(parametrosCuerpo: any): TiendaCreateDto;
    asignarValidadorActualizar(parametrosCuerpo: any, id: any): TiendaUpdateDto;
    crearInstanciaNueva(tiendaCreateDto: TiendaCreateDto): TiendaEntity;
    crearInstanciaActualizar(tiendaUpdateDto: TiendaUpdateDto): TiendaEntity;
}
