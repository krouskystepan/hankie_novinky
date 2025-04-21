import { TTag } from '@/constants/types'
import { clsx, type ClassValue } from 'clsx'
import mongoose from 'mongoose'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const connectToDatabase = async () => {
  try {
    if (!process.env.MONGO_URI) throw new Error('MONGO_URI is not defined')
    mongoose.set('strictQuery', false)
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✅ Connected to the database')
  } catch (error) {
    console.error('Error connecting to the database:', error)
  }
}

export const getStyleByTag = (tag: TTag) => {
  switch (tag) {
    case 'zabava':
      return 'bg-tag-one'
    case 'novinky':
      return 'bg-tag-two'
    case 'zajimavosti':
      return 'bg-tag-three'
    case 'tipy':
      return 'bg-tag-four'
    case 'outfity':
      return 'bg-tag-five'
    case 'jine':
      return 'bg-tag-six'
    default:
  }
}

export const getTagText = (tag: TTag) => {
  switch (tag) {
    case 'novinky':
      return 'NOvINky'
    case 'zajimavosti':
      return 'zaJImaVOstI'
    case 'tipy':
      return 'TIpY'
    case 'zabava':
      return 'zABaVa'
    case 'outfity':
      return 'oUTfiTy'
    case 'jine':
      return 'JInE'
    default:
      return ''
  }
}

const MAX_REPEATED_CHARS = 3

export const randomizeCaps = (str: string) => {
  let result = ''
  let streak = 0
  let currentCase: 'upper' | 'lower' | null = null

  for (let i = 0; i < str.length; i++) {
    const char = str[i]

    const makeUpper = Math.random() < 0.5
    const chosenCase = makeUpper ? 'upper' : 'lower'

    if (chosenCase === currentCase) {
      streak++
      if (streak >= MAX_REPEATED_CHARS) {
        currentCase = currentCase === 'upper' ? 'lower' : 'upper'
        streak = 1
      }
    } else {
      currentCase = chosenCase
      streak = 1
    }

    result += currentCase === 'upper' ? char.toUpperCase() : char.toLowerCase()
  }

  return result
}
