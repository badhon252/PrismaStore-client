import React from 'react'
import Container from './ui/container'
import Link from 'next/link'

export default function Navbar() {
  return (
    <div>
        <Container>
            <Link href='/' className='ml-4 flex lg:ml-0 gap-x-2'>
                <p className="font-bold text-xl">
                    STORE
                </p>
            </Link>
        </Container>
    </div>
  )
}
