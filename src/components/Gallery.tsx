/* eslint-disable @next/next/no-img-element */
'use client'

import { isValidUrl } from '@/lib/utils'
import React from 'react'

const Gallery = ({ images }: { images: string[] }) => {
  const validImages = images.filter(isValidUrl)

  if (validImages.length === 0) return null

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-8 grid gap-4">
      {validImages.length === 1 && (
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl border-4 border-custom-green max-w-md w-auto lg:w-md xl:w-xl mx-auto">
          <img
            src={validImages[0]}
            alt="hAnkIE fOtKA"
            className="size-full object-cover"
          />
        </div>
      )}

      {validImages.length === 2 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {validImages.map((img, i) => (
            <div
              key={i}
              className="relative aspect-[4/3] overflow-hidden rounded-xl border-4 border-custom-pink"
            >
              <img
                src={img}
                alt={`HaNkIe Pic ${i + 1}`}
                className="size-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {validImages.length === 3 && (
        <div className="grid grid-cols-4 grid-rows-4 gap-4">
          <div className="relative col-span-2 row-span-2 aspect-[4/3] -rotate-2 border-4 border-custom-red rounded-xl overflow-hidden">
            <img
              src={validImages[0]}
              alt="img 1"
              className="size-full object-cover"
            />
          </div>
          <div className="relative col-span-2 row-span-2 col-start-3 row-start-2 aspect-square rotate-3 border-4 border-custom-green rounded-xl overflow-hidden">
            <img
              src={validImages[1]}
              alt="img 2"
              className="size-full object-cover"
            />
          </div>
          <div className="relative col-span-2 row-span-2 aspect-[4/3] rotate-1 border-4 border-custom-purple rounded-xl overflow-hidden">
            <img
              src={validImages[2]}
              alt="img 3"
              className="size-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Gallery
