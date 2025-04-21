import { z } from 'zod'
import { TAGS } from '.'

export const adminFormSchema = z.object({
  title: z
    .string()
    .min(2, 'Nadpis článku je příliš krátký')
    .max(50, 'Nadpis článku je příliš dlouhý'),
  description: z
    .string()
    .min(2, 'Popis článku je příliš krátký')
    .max(400, 'Popis článku je příliš dlouhý'),
  images: z.array(z.string()).max(3, 'Můžeš zadat maximálně 3 URL obrázků'),
  tag: z.enum(TAGS, {
    required_error: 'Vyber tag článku',
    invalid_type_error: 'Vyber tag článku',
  }),
})
