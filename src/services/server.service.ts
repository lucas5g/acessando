import { CreateServerType, FindServerType } from "@/dtos/server.dto";
import { prisma } from "@/utils/prisma";
export class ServerService {
  findAll({name, masp}: FindServerType) {
    return prisma.server.findMany({
      where:{
        name: {
          contains: name
        },
        masp
      }
    })
  }

  create(data: CreateServerType) {
    return prisma.server.create({
      data
    })
  }
}