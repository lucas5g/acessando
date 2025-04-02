import index from "./index.html";
import { PhraseService } from "@/services/phrase.service";
import { ServerService } from "./services/server.service";
import { findPhraseSchema } from "./dtos/phrase.dto";
import { createServerSchema, findServerSchema } from "./dtos/server.dto";

const phraseService = new PhraseService()
const serverService = new ServerService()

const server = Bun.serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,
    '/phrases': {
      async GET(req) {
        const url = new URL(req.url)

        const queryObject = Object.fromEntries(url.searchParams)
        const query = findPhraseSchema.parse(queryObject)
        return Response.json(await phraseService.findAll(query))
      },
      async POST(req) {
        const body = await req.json()
        return Response.json(await phraseService.create(body), { status: 201 })
      },
      async DELETE(req) {
        return Response.json(await phraseService.reset())
      }

    },
    '/audios/:id.mp3': async (req) => {
      const id = req.params['id.mp3'].split('.')[0]
      const phrase = await phraseService.findOne(Number(id))
      return new Response(phrase?.audio, {
        headers: {
          'Content-Type': 'audio/mpeg'
        }
      })
    },
    '/servers': {
      async GET(req) {
        const url = new URL(req.url)
        const queryObject = Object.fromEntries(url.searchParams)
        const query = findServerSchema.parse(queryObject)

        return Response.json( await serverService.findAll(query))
      },
      async POST(req) {
        const body = createServerSchema.parse(await req.json())
        return Response.json(await serverService.create(body), { status: 201 })
      }
    },


    '/version': () => Response.json({ version: '0.4.2' }),
  },  
  fetch() {
    return new Response("Not Found", { status: 404 });
  },
  development: process.env.NODE_ENV !== "production",
});

console.log(`🚀 Server running at ${server.url}`);
