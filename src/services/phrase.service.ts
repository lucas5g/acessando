import { elevenLabs } from "@/utils/eleven-labs";
import { prisma } from "@/utils/prisma";
import { translate } from "@/utils/translate";
import { Prisma } from "@prisma/client";
export class PhraseService {
  async create({ english, tag }: any) {
    const [portuguese, audio] = await Promise.all([
      translate(english),
      elevenLabs(english)
    ])

    await new Promise(resolve => setTimeout(resolve, 2000))

    const tagCreated = await prisma.tag.upsert({
      create: {
        name: tag
      },
      update: {
        name: tag
      },
      where: {
        name: tag
      }
    })

    const data: Prisma.PhraseCreateInput = {
      english,
      audio,
      portuguese,
    }

    const phrase = await prisma.phrase.upsert({
      create: data,
      update: data,
      where: {
        english,
      },
      select:{
        id: true,
        english: true,
        portuguese: true,
        tags: {
          select: {
            tagId: true
          }
        }
      }
    });

    if (!phrase.tags.some(row => row.tagId === tagCreated.id)) {
      await prisma.phraseTag.create({
        data: {
          phraseId: phrase.id,
          tagId: tagCreated.id
        }
      })
    }

    return phrase;

  }

  async findAll({ tag, ...query }: any) {
    const res = await prisma.phrase.findMany({
      where: {
        tags: {
          some: {
            Tag: {
              name: tag
            }
          }
        },
        ...query,
      },
      select: {
        id: true,
        english: true,
        portuguese: true
      },
      take: 50
    })
    return res.map(row => ({
      ...row,
      audio: `https://acessando.app.br/audios/${row.id}.mp3`
    }))
  }

  findOne(id: number) {
    return prisma.phrase.findUnique({
      where: {
        id
      }
    })
  }

}