import {Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {MascotaEntity} from "../mascota/mascota.entity";

@Index([
    "nombre",
    "apellido",
    "cedula",
    "fechaNacimiento" // Nombre de las propiedades en la clase
])
@Index(
    ["nombre", "apellido", "cedula"],
    {unique: true}
)
@Entity("epn_usuario") // nombre de la tabla usuarios
export class UsuarioEntity{
    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: "id"
    })
    id: number;

    @Column({
        name: 'nombre',
        type: "varchar",
        nullable: true,
        length: 18
    })
    nombre?: string;

    @Column({
        name: 'apellido',
        type: "varchar",
        nullable: true,
        length: 60
    })
    apellido?: string;

    @Column({
        name: 'cedula',
        type: "varchar",
        nullable: false,
        unique: true,
        length: 18
    })
    cedula: string;

    @Column({
        nullable: true,
        type: "decimal",
        precision: 10, // 1000000000
        scale: 4 // .0001
    })
    sueldo?: number;

    @Column({
        nullable: true,
        type: "date",
        name: "fecha_nacimiento"
    })
    fechaNacimiento?: string;

    @Column({
        nullable: true,
        type: "datetime",
        name: "fecha_hora_nacimiento"
    })
    fechaHoraNacimiento?: string;

    @OneToMany(
        type => MascotaEntity,
        // Que entidad ns relacionamos
        mascota => mascota.usuario
        // Campo con el q relacionamos
    )
    mascotas: MascotaEntity[];
}