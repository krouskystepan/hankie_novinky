import Image from 'next/image'

const SayHi = () => {
  return (
    <div className="flex justify-evenly font-bold tracking-widest text-center py-12 bg-custom-yellow rounded-lg">
      <div className="flex justify-center items-center flex-col">
        <h2 className="text-4xl text-custom-green mb-4">
          AhoJ! JseM rÁd, žE jSTe Tu!! 🎉
        </h2>
        <p className="text-2xl text-custom-red italic">
          tADy Je hAnKIe 💖 jSeM rÁD, žE SeS ZdE pŘiDaL!!! 😎
        </p>
        <p className="mt-4 text-lg text-gray-700">
          PoDiVej Se Na NejNoVěJšÍ PříSpěVkY, kTéRé JsEm VYKrAftIL!! 📸📝
        </p>
      </div>
      <div className="relative h-72 aspect-square">
        <Image
          src="/hank.png"
          alt="Hankie Photo"
          width={300}
          height={300}
          priority
          quality={70}
        />
      </div>
    </div>
  )
}

export default SayHi
