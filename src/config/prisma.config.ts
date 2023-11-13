import { PrismaClient } from '@prisma/client'
const prismaI = new PrismaClient({ log: ['info', 'query'] })

export default prismaI
