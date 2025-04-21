'use client'

import { toast } from 'sonner'
import { Button } from './ui/button'
import { useId, useState } from 'react'
import { Textarea } from './ui/textarea'
import { randomizeCaps } from '@/lib/utils'

const Convertor = () => {
  const id = useId()

  const [text, setText] = useState<string>('')
  const [randomizedText, setRandomizedText] = useState<string>('')

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value
    setText(newText)
    setRandomizedText(randomizeCaps(newText))
  }

  const handleCopy = () => {
    navigator.clipboard
      .writeText(randomizedText)
      .then(() => toast.success('Text byl zkopírován!'))
      .catch(() => toast.error('Nepodařilo se zkopírovat text!'))
  }

  return (
    <div>
      <p className="mb-3 text-left text-sm font-semibold tracking-widest">
        {'SPeCIal chARs: # $ % & @ < = > ! ? ~ ^ _ |'}
      </p>
      <div className="space-y-2">
        <Textarea
          id={id}
          value={text}
          placeholder="sEM DeJ tExT"
          onChange={handleTextChange}
          className="border-2 border-custom-pink shadow-none field-sizing-content max-h-40 min-h-34 resize-none py-1.75"
        />
        <Textarea
          id={id}
          className="bg-muted border-2 border-custom-orange shadow-none field-sizing-content max-h-40 min-h-24 resize-none py-1.75"
          value={randomizedText}
          readOnly
          placeholder="tADY BUDE tExt"
        />
        <Button
          onClick={handleCopy}
          variant={'ghost'}
          className="border-2 border-custom-green w-full hover:bg-custom-green"
        >
          KopIroVAt teXt
        </Button>
      </div>
    </div>
  )
}

export default Convertor
