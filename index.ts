const server = Bun.serve({
  port: 3213,
  routes: {
    '/': () => Response.json({ message: 'Hello, World!' })
  }
})

console.log(`🚀 Server running at ${server.url}`);
