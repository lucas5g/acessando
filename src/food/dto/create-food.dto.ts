import { IsNumber, IsString } from "class-validator";

export class CreateFoodDto {

  @IsString()
  name: string

  @IsNumber()
  kcal: number

  @IsNumber()
  protein: number

  @IsNumber()
  fat: number

  @IsNumber()
  carb: number
}
