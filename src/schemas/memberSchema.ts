import { z } from 'zod'
import { INTEREST_AREAS, EXPERIENCE_LEVELS, AVAILABILITY_OPTIONS, BRAZIL_STATES } from '../constants/options'

const urlSchema = z
  .string()
  .optional()
  .refine(
    (val) => !val || val === '' || /^https?:\/\/.+\..+/.test(val),
    { message: 'URL inválida. Use o formato https://...' }
  )

const whatsappSchema = z
  .string()
  .optional()
  .refine(
    (val) => !val || val === '' || /^\(\d{2}\) \d{4,5}-\d{4}$/.test(val),
    { message: 'WhatsApp inválido. Use o formato (11) 91234-5678' }
  )

export const memberSchema = z.object({
  full_name: z
    .string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(100, 'Nome muito longo'),
  email: z
    .string()
    .email('E-mail inválido')
    .max(150, 'E-mail muito longo'),
  city: z
    .string()
    .min(2, 'Cidade deve ter no mínimo 2 caracteres')
    .max(80, 'Nome da cidade muito longo'),
  state: z
    .string()
    .refine(
      (val) => BRAZIL_STATES.some((s) => s.value === val),
      { message: 'Selecione um estado válido' }
    ),
  interest_area: z
    .enum(INTEREST_AREAS, { error: 'Selecione uma área de interesse' }),
  about: z
    .string()
    .min(20, 'Conte um pouco mais sobre você (mínimo 20 caracteres)')
    .max(600, 'Máximo de 600 caracteres'),
  linkedin_url: z
    .string()
    .min(1, 'LinkedIn é obrigatório')
    .refine((val) => /^https?:\/\/.+\..+/.test(val), { message: 'URL inválida. Use o formato https://...' }),
  github_url: z
    .string()
    .min(1, 'GitHub é obrigatório')
    .refine((val) => /^https?:\/\/.+\..+/.test(val), { message: 'URL inválida. Use o formato https://...' }),
  portfolio_url: urlSchema,
  whatsapp: whatsappSchema,
  current_role: z.string().max(100, 'Cargo muito longo').optional(),
  experience_level: z
    .enum(EXPERIENCE_LEVELS)
    .optional(),
  availability: z
    .enum(AVAILABILITY_OPTIONS)
    .optional(),
  terms_accepted: z
    .boolean()
    .refine((val) => val === true, { message: 'Você precisa aceitar os termos para continuar' }),
})

export type MemberSchemaData = z.infer<typeof memberSchema>
