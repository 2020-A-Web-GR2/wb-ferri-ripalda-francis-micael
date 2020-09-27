import { IsInt, IsNotEmpty, Min, MinLength, MaxLength, IsOptional, IsNumber } from 'class-validator';

export class TiendaUpdateDto {
    
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    id: number;

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(45)
    nombre: string;

    
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    ubicacion: string;
    
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(45)
    tipo: string;
    
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    responsable: string;
    
    @IsOptional()
    @IsNumber()
    @Min(0)
    dinero: number;

}