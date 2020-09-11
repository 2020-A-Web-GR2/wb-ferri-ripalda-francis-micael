import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import { UsuarioEntity } from './usuario.entity';
import {Between, FindManyOptions, In, IsNull, LessThan, LessThanOrEqual, Like, MoreThan, MoreThanOrEqual, Not, Repository} from "typeorm";

@Injectable()
export class UsuarioService{
    constructor( // Inyeccion de dependecias
        @InjectRepository(UsuarioEntity)
        private repositorio: Repository<UsuarioEntity>
    ) {
    }
    crearUno(nuevoUsuario:UsuarioEntity){
        return this.repositorio.save(nuevoUsuario) // Promesa
    }

    buscarTodos(textoConsulta?: String){
        const consulta: FindManyOptions<UsuarioEntity> = {
            where: [
                {
                    nombre: Like(`%${textoConsulta}%`)
                },
                {
                    apellido: Like(`%${textoConsulta}%`)
                },
                {
                    cedula: Like(`%${textoConsulta}%`)
                }
            ]
        }
        return this.repositorio.find(consulta) // Promesa

        /* let busquedaEjemplo: FindManyOptions<UsuarioEntity>
        // Buscar y relacionar
        busquedaEjemplo = {
            relations: ["mascotas", "mascota.vacunas"]
        }

        // buscar where
        busquedaEjemplo = {
            where: {
                nombre: "Francis", // Busqueda exacta
                apellido: "Ferri"
            }
        }
        busquedaEjemplo = {
            order: {
                nombre: "ASC",
                id: "DESC"
                // Adrian Eguez 2
                // Adrian Sarzosa 1
                // Vicente Peres 3
            }
        }
        // Buscar paginacion
        busquedaEjemplo = {
            // Primera Pagina
            // skip: 0 // (0 *10)) de 100 registrso saltate 0 registros
            // take: 10 // de 1000 registros agarra 10
            // Segunda pagina
            // skip: 1 // (1 *10)) de 100 registrso saltate 0 registros
            // take: 10 // de 1000 registros agarra 10
            // Tercera pagina
            skip: 20, // (2* 10) de 100 registros saltate 10 registros
            take: 20 // de 100 registros, agarra 10 registros
        }

        // buscar where
        busquedaEjemplo = {
            where: [
                {
                    nombre: "Francis", // Busqueda exacta
                },
                {
                    apellido: "Ferri"
                }
            ]
        }

        // buscar where
        busquedaEjemplo = {
            where: [
                {
                    nombre: "Francis", // AND
                    apellido: "Ferri"
                }, // OR
                {
                    nombre: "Ferri", // AND
                    apellido: "Francis"
                }
            ]
        }

        // buscar NOT
        busquedaEjemplo = {
            where: {
                nombre: Not("Francis"), // Busqueda exacta
            }
        }

        // buscar LESS THAN
        busquedaEjemplo = {
            where: {
                fechaNacimiento: LessThan("1990-01-01"), // Busqueda exacta
            }
        }

        // buscar LESS THAN OR EQUAL
        busquedaEjemplo = {
            where: {
                fechaNacimiento: LessThanOrEqual
                ("1990-01-01"), // Busqueda exacta
            }
        }

        // buscar MORE THAN
        busquedaEjemplo = {
            where: {
                fechaNacimiento: MoreThan
                ("1990-01-01"), // Busqueda exacta
            }
        }

        
        
        // buscar Like
        busquedaEjemplo = {
            where: {
                nombre: MoreThanOrEqual
                ("1990-01-01"), // Busqueda exacta
            }
        }
        
        // buscar MORE THAN or EQUAL
        busquedaEjemplo = {
            where: {
                nombre: Like("%dr%")
            }
        }
        
        // buscar Between
        busquedaEjemplo = {
            where: {
                fechaNacimiento: Between
                ("1990-01-01", "2020-01-01"), // Busqueda exacta
            }
        }

        // buscar In
        busquedaEjemplo = {
            where: {
                fechaNacimiento: In([1,2,3,4,5,6]), // Busqueda exacta
            }
        }

        // buscar Isnull
        busquedaEjemplo = {
            where: {
                casado: IsNull(), // Busqueda exacta
            }
        } */
        
       
    }

    buscarUno(id: number){
        return this.repositorio.findOne(id) // Promesa
    }
    editarUno(usuarioEditado: UsuarioEntity){
        return this.repositorio.save(usuarioEditado);
    }

    eliminarUno(id: number){
        return this.repositorio.delete(id);
    }


}