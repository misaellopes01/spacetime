import fastify from 'fastify'

const app = fastify()

app.get('/', () => {
  return { message: 'Misael Lopes' }
})

app
  .listen({
    port: 3333,
  })
  .then(() => console.log(' server running on http://localhost:3333'))