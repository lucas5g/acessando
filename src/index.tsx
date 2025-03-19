import { serve } from "bun";
import index from "./index.html";
import { PhraseService } from "@/services/phrase.service";

const phraseService = new PhraseService()

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,
    '/phrases': {
      async GET(req) {
        const url = new URL(req.url)
        const search = url.searchParams.get('search')
        return Response.json(await phraseService.findAll(search ?? undefined))
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

    '/version': () => Response.json({ version: '0.0.18' })
  },

  development: process.env.NODE_ENV !== "production",
});

console.log(`🚀 Server running at ${server.url}`);
