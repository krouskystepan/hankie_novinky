'use client'

import { toast } from 'sonner'
import { Button } from './ui/button'
import { useId, useState } from 'react'
import { Textarea } from './ui/textarea'
import { randomizeCaps } from '@/lib/utils'
import { Smile, X } from 'lucide-react'
import { EmojiPicker } from '@ferrucc-io/emoji-picker'

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

        {showPicker && (
          <EmojiPicker
            className="absolute top-full right-0 z-50 w-full border-neutral-400 shadow-none"
            emojisPerRow={9}
            emojiSize={36}
            onEmojiSelect={(emoji) => {
              setText((prev) => prev + emoji)
              setRandomizedText((prev) => randomizeCaps(prev + emoji))
              setShowPicker(false)
            }}
          >
            <EmojiPicker.Header className="border-b border-neutral-400">
              <EmojiPicker.Input
                placeholder="VyHleDEJ eMoJi"
                className="h-8 border border-custom-pink rounded-md text-base my-2.5 bg-white px-2 focus:border-custom-red"
                hideIcon
              />
              <Button
                variant={'outline'}
                size={'icon'}
                className="h-8 cursor-pointer border border-custom-pink hover:bg-custom-pink"
                onClick={() => setShowPicker(false)}
              >
                <X />
              </Button>
            </EmojiPicker.Header>
            <EmojiPicker.Group>
              <EmojiPicker.List hideStickyHeader containerHeight={280} />
            </EmojiPicker.Group>
          </EmojiPicker>
        )}
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
