import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateFoodDto {

  @ApiProperty()
  @IsNotEmpty()
  name: string

  @ApiProperty()
  @IsNumber()
  kcal: number

  @ApiProperty()
  @IsNumber()
  protein: number

  @ApiProperty()
  @IsNumber()
  fat: number

  @ApiProperty()
  @IsNumber()
  carb: number

  @ApiProperty()
  @IsNumber()
  fiber: number
}
