'use client'

import Link from 'next/link'
import React from 'react'
import Container from '../Container'
import { signOut, useSession } from 'next-auth/react'

const Footer = () => {
  const { data: session } = useSession()

  return (
    <Container>
      <footer className="border-t-2 border-custom-orange relative w-full mx-auto max-w-screen-xl p-6 text-center">
        <span className="text-lg tracking-widest">
          © rOK 69{' '}
          <Link href="/" className="hover:underline font-bold">
            HaNK MOODy™
          </Link>
          . JoJO TAdY PrÁVA.
        </span>
        <ul className="mt-1 flex flex-wrap justify-center items-center text-base font-medium gap-4">
          <li>
            <Link
              href="/"
              className="text-custom-green hover:underline me-4 md:me-6"
            >
              tADY
            </Link>
          </li>
          <li>
            <Link
              href="/tadyne"
              className="text-custom-red hover:underline me-4 md:me-6"
            >
              tAdY NE
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="text-custom-yellow hover:underline me-4 md:me-6"
            >
              jA JsEM HanKIE
            </Link>
          </li>
          {session?.user?.name && (
            <li>
              <p
                onClick={() => signOut()}
                className="cursor-pointer text-custom-blue hover:underline me-4 md:me-6"
              >
                OdHlaSiT SE
              </p>
            </li>
          )}
        </ul>
        {session?.user?.name && (
          <>
            <span className="mx-auto">
              JsI PRihlAsEn jAko UziVatEL: {session?.user?.name}
            </span>
            <br />
          </>
        )}

        <span className="mx-auto">
          Web Vytvořil:{' '}
          <Link
            href="https://www.krouskystepan.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            D4rzk
          </Link>
        </span>
      </footer>
    </Container>
  )
}

export default Footer
