import { z } from 'zod'
import { TAGS } from '.'

export const postFormSchema = z.object({
  title: z
    .string()
    .min(2, 'Nadpis článku je příliš krátký')
    .max(50, 'Nadpis článku je příliš dlouhý'),
  description: z
    .string()
    .min(2, 'Popis článku je příliš krátký')
    .max(400, 'Popis článku je příliš dlouhý'),
  images: z.array(z.string()).max(3, 'Můžeš zadat maximálně 3 URL obrázků'),
  video: z.string().optional(),
  tag: z.enum(TAGS, {
    required_error: 'Vyber tag článku',
    invalid_type_error: 'Vyber tag článku',
  }),
})

export const adminFormSchema = z.object({
  username: z
    .string()
    .min(2, 'Uživatelské jméno je příliš krátké')
    .max(10, 'Uživatelské jméno je příliš dlouhé'),
  password: z.string().min(2, 'Heslo je příliš krátké'),
})

export const deleteAdminFormSchema = z.object({
  username: z.string(),
})
