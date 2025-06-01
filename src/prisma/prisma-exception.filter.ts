import { Food } from "@/food/entities/food.entity";
import { ArgumentsHost, Catch, ConflictException, ExceptionFilter, HttpException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError) {


    const model = {
      Food: 'Alimento',
    }
    if (exception.code === 'P2002') {
      throw new ConflictException(`${model[exception.meta?.modelName as string]} já cadastrado`)
    }

    if (exception.code === 'P2025') {
      throw new NotFoundException(`${model[exception.meta?.modelName as string]} não encontrado`)
    }
    throw new InternalServerErrorException('Erro no banco');
  }
}