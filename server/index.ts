import Elysia from "elysia";
import { phraseController } from "./controllers/phrase.controller";
import { swagger } from '@elysiajs/swagger'

const port = 8000
new Elysia()
  .use(swagger())
  .use(phraseController)
  .get('/', { api: 'Meu primeiro servidor' })
  .listen(port, () => console.log(`🚀 Server running at http://localhost:${port}`));
