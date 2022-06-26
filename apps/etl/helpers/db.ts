import { PrismaClient } from "@prisma/client"

const db = new PrismaClient()
db.$connect()

export { db }
