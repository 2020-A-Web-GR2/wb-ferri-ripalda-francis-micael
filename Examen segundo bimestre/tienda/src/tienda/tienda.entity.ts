import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("Tienda")
export class TiendaEntity {
    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: "Identifier",
        name: "id_tienda"
    })
    id: number;

    @Column({
        name: "nombre",
        type: "varchar",
        length: 45,
        unique: true,
        nullable: false,
    })
    nombre: string;

    @Column({
        name: "ruc",
        type: "varchar",
        length: 13,
        unique: true,
        nullable: false
    })
    ruc: string;
    
    @Column({
        name: "ubicacion",
        type: "varchar",
        length: 100,
        unique: false,
        nullable: false
    })
    ubicacion: string;

    @Column({
        name: "tipo",
        type: "varchar",
        length: 45,
        unique: false,
        nullable: false
    })
    tipo: string;


    @Column({
        name: "responsable",
        type: "varchar",
        length: 100,
        unique: false,
        nullable: false
    })
    responsable: string;

    @Column({
        name: "dinero",
        type: "decimal",
        nullable: true,
        precision: 10,
        scale: 2
    })
    dinero?: number;
    
}