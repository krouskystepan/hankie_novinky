import Image from 'next/image'

const Gallery = ({ images }: { images: string[] }) => {
  const count = images.length

  if (count === 1) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4">
        <div className="aspect-[4/3] relative rounded-xl overflow-hidden shadow-lg">
          <Image src={images[0]} alt="obrázek" fill className="object-cover" />
        </div>
      </div>
    )
  }

  if (count === 2) {
    return (
      <div className="max-w-5xl mx-auto py-12 px-4 flex gap-6 flex-col sm:flex-row">
        {images.map((img, i) => (
          <div
            key={i}
            className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg"
          >
            <Image
              src={img}
              alt={`obrázek ${i + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    )
  }

  if (count === 3) {
    return (
      <div className="relative max-w-4xl mx-auto px-6 py-16 space-y-12">
        {/* Obrázek 1 */}
        <div className="w-2/3 relative z-30">
          <div className="w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
            <Image
              src={images[0]}
              alt="obrázek 1"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Obrázek 2 */}
        <div className="w-2/3 ml-auto -mt-16 relative z-20">
          <div className="w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
            <Image
              src={images[1]}
              alt="obrázek 2"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Obrázek 3 */}
        <div className="w-2/3 -mt-12 relative z-10">
          <div className="w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
            <Image
              src={images[2]}
              alt="obrázek 3"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default Gallery
