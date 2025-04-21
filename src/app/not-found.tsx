'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const NotFound = () => {
  return (
    <main className="flex-1 flex flex-col justify-center items-center text-center bg-custom-orange text-custom-green p-6 gap-6 font-bold">
      <h1 className="text-6xl tracking-tight animate-bounce">4️⃣ 0️⃣ 4️⃣ 😵‍💫</h1>
      <p className="text-4xl tracking-widest max-w-lg">
        tADy nIc NEnÍ... MožNá jSi ZABLouDIL 🧃🪁
      </p>

      <Link href="/">
        <Button className="px-12 py-6 bg-custom-purple hover:bg-custom-red border-custom-green border-2 text-xl">
          zPáTky dO BEZPeČí 🏡
        </Button>
      </Link>
    </main>
  )
}

export default NotFound
