import { IsAlpha, MinLength, MaxLength, IsNumber, IsPositive, IsString, IsDateString, IsNotEmpty, IsOptional } from "class-validator";

export class UsuarioUpdateDto{

    // Es necesario obtener el ID del usuario
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    id: number;

    @IsOptional()
    @IsAlpha()
    @MinLength(3)
    @MaxLength(60)
    nombre: string;

    @IsOptional()
    @IsAlpha()
    @MinLength(3)
    @MaxLength(60)
    apellido: string;

    // La cedula no se le permite cambiar
    
    @IsOptional()
    @IsNumber()
    @IsPositive()
    sueldo?: number;

    @IsOptional()
    @IsString()
    fechaNacimiento?: string;

    @IsOptional()
    @IsDateString()
    fechaHoraNacimiento?: string;
}