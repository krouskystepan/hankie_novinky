import { ReactNode } from 'react'

const Container = ({
  children,
  className,
  innerClassName,
}: {
  children: ReactNode
  className?: string
  innerClassName?: string
}) => {
  return (
    <section className={`px-4 md:px-6 xl:px-8 ${className}`}>
      <div className={`max-w-7xl mx-auto ${innerClassName}`}>{children}</div>
    </section>
  )
}

export default Container
