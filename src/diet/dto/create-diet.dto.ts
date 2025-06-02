import { ApiProperty } from "@nestjs/swagger";
import { Meal } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";

export class CreateDietDto {
  @ApiProperty({
    enum: Meal
  })
  @IsEnum(Meal)
  meal: Meal

  @ApiProperty()
  @IsNumber()
  foodId: number

  @ApiProperty()
  @IsNumber({}, { message: "Quantidade deve ser um número." })
  quantity: number


}
