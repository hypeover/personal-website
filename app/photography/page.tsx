import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <div className='h-screen w-screen justify-center text-center flex flex-col text-5xl' >
      Soon...
      <Link href='/' ><Button className='text-3xl p-10 rounded-full mt-5' >Back to home</Button></Link>
    </div>
  )
}

export default Page