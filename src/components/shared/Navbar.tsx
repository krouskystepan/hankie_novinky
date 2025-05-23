'use client'

import Container from '../Container'
import { Button, buttonVariants } from '../ui/button'
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '../ui/dialog'

import Convertor from '../Convertor'
import Link from 'next/link'
import { User } from 'lucide-react'
import { Session } from 'next-auth'

const Navbar = ({ session }: { session: Session | null }) => {
  return (
    <Container className="bg-custom-pink">
      <nav className="py-4 flex flex-col md:flex-row justify-around items-center gap-2">
        <Link
          href={'/'}
          className="text-center text-custom-green duration-200 transition-colors hover:text-custom-yellow font-bold text-2xl md:text-3xl tracking-wider"
        >
          {'H-News 💖💥 :---)'}
        </Link>
        <div className="flex gap-2">
          <Link
            href={'/admin/post'}
            className={buttonVariants({
              variant: 'ghost',
              className:
                'bg-custom-red hover:bg-custom-purple border-2 border-custom-purple font-semibold tracking-wide',
            })}
          >
            tadY neKliKej
          </Link>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="bg-custom-orange hover:bg-custom-yellow border-2 border-custom-green font-semibold tracking-wide cursor-pointer"
              >
                ConVERter
              </Button>
            </DialogTrigger>
            <DialogContent
              className="w-md text-center"
              onInteractOutside={(e) => {
                e.preventDefault()
              }}
            >
              <DialogHeader>
                <DialogTitle className="tracking-widest">
                  {'Tady nějakou parádu :---)'}
                </DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>

              <Convertor />
            </DialogContent>
          </Dialog>
          {session?.user.role === 'admin' && (
            <Button
              asChild
              variant="ghost"
              size={'icon'}
              className="bg-custom-purple hover:bg-custom-yellow border border-custom-orange"
            >
              <Link href={'/admin/manage'}>
                <User />
              </Link>
            </Button>
          )}
        </div>
      </nav>
    </Container>
  )
}

export default Navbar
