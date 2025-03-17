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
        const queryParams = Object.fromEntries(url.searchParams.entries())
        return Response.json(await phraseService.findAll(queryParams))
      },
      async POST(req) {
        const body = await req.json();
        return Response.json({
          message: "Hello, world!",
          method: "POST",
          body,
        });
      },
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

    "/api/hello": {
      async GET(req) {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async PUT(req) {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },

    "/api/hello/:name": async (req) => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },
  },

  development: process.env.NODE_ENV !== "production",
});

console.log(`🚀 Server running at ${server.url}`);
