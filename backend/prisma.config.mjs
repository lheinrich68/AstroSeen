import 'dotenv/config'
import { defineConfig, env } from 'prisma/config'

// Prisma 7 : l'URL de connexion ne vit plus dans schema.prisma, elle est
// définie ici pour tout ce qui passe par la CLI (migrate, db seed, studio...).
// Le PrismaClient runtime, lui, reçoit sa propre configuration via un
// adaptateur de driver — voir src/config/db.js.
export default defineConfig({
    schema: 'prisma/schema.prisma',
    migrations: {
        path: 'prisma/migrations',
    },
    datasource: {
        url: env('DATABASE_URL'),
    },
})