import { ApiProperty } from "@nestjs/swagger";
import { Meal } from "@prisma/client";
import { IsEnum, IsNumber } from "class-validator";

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
  @IsNumber()
  quantity: number


}
