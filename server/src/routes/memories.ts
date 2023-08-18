import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function memoriesRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })
  app.get('/memories', async (request) => {
    const { sub } = request.user

    const memories = await prisma.memory.findMany({
      orderBy: {
        createdAt: 'asc',
      },
      where: {
        userId: sub,
      },
    })
    return memories.map((memory) => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt: memory.content
          .substring(0, 115)
          .concat(`${memory.content.length > 115 ? '...' : ''}`),
      }
    })
  })
  app.get('/memories/:id', async (request, response) => {
    const { sub } = request.user
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsSchema.parse(request.params)
    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })

    if (!memory.isPublic && memory.userId !== sub) {
      return response.status(401).send()
    }
    return memory
  })
  app.post('/memories', async (request) => {
    const { sub } = request.user

    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })
    const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

    const memory = await prisma.memory.create({
      data: {
        userId: sub,
        content,
        coverUrl,
        isPublic,
      },
    })
    return memory
  })
  app.put('/memories/:id', async (request, response) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })
    const { id } = paramsSchema.parse(request.params)
    const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

    let memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })
    if (memory.userId !== request.user.sub) {
      return response.status(401).send()
    }

    memory = await prisma.memory.update({
      where: {
        id,
      },
      data: {
        content,
        coverUrl,
        isPublic,
      },
    })
    return memory
  })
  app.delete('/memories/:id', async (request, response) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsSchema.parse(request.params)

    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })
    if (memory.userId !== request.user.sub) {
      return response.status(401).send()
    }

    await prisma.memory.delete({
      where: {
        id,
      },
    })
  })
}
