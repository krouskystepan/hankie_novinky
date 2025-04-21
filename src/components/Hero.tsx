import { HERO_GIFS } from '@/constants'
import Image from 'next/image'
import Container from './Container'
import SayHi from './SayHi'

const Hero = () => {
  return (
    <Container className="bg-custom-yellow py-4">
      <div className="flex flex-col sm:flex-row justify-evenly items-center gap-5">
        {HERO_GIFS.map((gif, index) => (
          <Image
            key={index}
            src={gif.path}
            alt={gif.alt}
            width={500}
            height={500}
            className="size-48"
            priority
            quality={70}
          />
        ))}
      </div>
      <div className="hidden sm:flex justify-evenly items-center gap-5">
        <p className="text-custom-red text-lg font-semibold">ZtUTa HouBa</p>
        <p className="text-custom-green text-lg font-semibold">POZOR</p>
        <p className="text-custom-red text-lg font-semibold">hAmBuRgeR</p>
      </div>
      <SayHi />
    </Container>
  )
}

export default Hero
