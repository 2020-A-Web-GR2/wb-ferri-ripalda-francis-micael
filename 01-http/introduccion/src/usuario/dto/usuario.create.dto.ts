import { IsNotEmpty, IsAlpha, MinLength, MaxLength, IsNumberString, Length, IsNumber, IsPositive, IsDateString, IsString, IsOptional } from "class-validator";

export class UsuarioCreateDto {
    
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

    @IsNotEmpty()
    @IsNumberString()
    @Length(10)
    cedula: string;

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