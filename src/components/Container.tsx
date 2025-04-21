import { ReactNode } from 'react'

const Container = ({
  children,
  bgColor = 'white',
}: {
  children: ReactNode
  bgColor?: string
}) => {
  return (
    <section className={`px-4 md:px-6 xl:px-8 ${bgColor}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  )
}

export default Container
