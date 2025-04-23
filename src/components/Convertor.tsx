'use client'

import { toast } from 'sonner'
import { Button } from './ui/button'
import { useId, useState } from 'react'
import { Textarea } from './ui/textarea'
import { randomizeCaps } from '@/lib/utils'
import EmojiPicker from 'emoji-picker-react'
import { Smile } from 'lucide-react'

const Convertor = () => {
  const id = useId()

  const [text, setText] = useState<string>('')
  const [randomizedText, setRandomizedText] = useState<string>('')
  const [showPicker, setShowPicker] = useState(false)

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
      <div className="mb-3 flex items-center justify-between relative">
        <p className="text-left text-sm font-semibold tracking-widest">
          {'SPeCIal chARs: # $ % & @ < = > ! ? ~ ^ _ |'}
        </p>

        <Button
          className="cursor-pointer border-2 border-custom-blue hover:bg-custom-blue"
          variant={'secondary'}
          size={'icon'}
          onClick={() => setShowPicker((prev) => !prev)}
        >
          <Smile />
        </Button>

        <EmojiPicker
          onEmojiClick={(emojiObj) => {
            setText((prevInput) => prevInput + emojiObj.emoji)
            setRandomizedText((prevInput) => prevInput + emojiObj.emoji)
            setShowPicker(false)
          }}
          open={showPicker}
          width={'100%'}
          height={375}
          lazyLoadEmojis={true}
          style={{
            position: 'absolute',
            top: '100%',
            right: '0',
            zIndex: 9999,
          }}
        />
      </div>

      <div className="space-y-2">
        <Textarea
          id={id}
          value={text}
          placeholder="sEM DeJ tExT"
          onChange={handleTextChange}
          className="!text-lg border-2 border-custom-pink shadow-none h-44 resize-none py-1.75"
        />
        <Textarea
          id={id}
          className="!text-lg bg-muted border-2 border-custom-orange shadow-none h-44 resize-none py-1.75"
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
