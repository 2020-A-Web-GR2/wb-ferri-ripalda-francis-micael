import { IsAlpha, IsAlphanumeric, IsNotEmpty, IsNumber, IsNumberString, IsOptional, Length, MaxLength, Min, MinLength } from "class-validator";

export class TiendaCreateDto {

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(45)
    nombre: string;

    @IsNotEmpty()
    @IsNumberString()
    @Length(13)
    ruc: string;
    
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