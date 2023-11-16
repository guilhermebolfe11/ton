import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  USERS_TABLE: z.string().default('users'),
  COUNTER_API_URL: z.string().default('http://localhost:1111'),
  COUNTER_API_KEY: z.string().default('api-key'),
  COUNTER_TABLE: z.string().default('counter'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format())
  throw new Error('Invalid environment variables.')
}

export const env = _env.data
