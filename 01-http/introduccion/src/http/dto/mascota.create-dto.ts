// @IsAlpha()
// @IsNotEmpty()
// @MinLength()
// @MaxLength()
// @IsBoolean()
// @IsEmpty()
// @IsInt()
// @IsPositive()
// @IsOptional()
// @IsNumber()
import {
    IsAlpha,
    IsBoolean,
    IsInt,
    isInt, IsNotEmpty,
    isNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    Max, MaxLength,
    Min, MinLength
} from "class-validator";

export class MascotaCreateDto{
    @IsNotEmpty()
    @IsAlpha()
    @MinLength(3)
    @MaxLength(60)
    nombre: string;
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    //@Max(100)
    edad: number; //enteros
    @IsNotEmpty()
    @IsBoolean()
    casada: boolean;
    @IsOptional()
    @IsBoolean()
    ligada?: boolean;
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    //@Max(300)
    peso: number; // decimales
}