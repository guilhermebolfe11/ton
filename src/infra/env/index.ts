import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  USERS_TABLE: z.string().default('users'),
  COUNTER_API_URL: z.string(),
  COUNTER_API_KEY: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format())
  throw new Error('Invalid environment variables.')
}

export const env = _env.data
