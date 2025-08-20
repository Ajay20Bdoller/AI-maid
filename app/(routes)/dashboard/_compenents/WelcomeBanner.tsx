import { Button } from '@/components/ui/button'
import React from 'react'

function WelcomeBanner() {
  return (
    <div className='p-5 bg-gradient-to-r from-[#BE575F] via-[#AC76D6] rounded-xl'>
    <h2 className='font-bold text-2xl text-white'>Aimaid Workspace</h2>
    <p className='text-white'>Smarter Career Decision...</p>
    <Button variant={'outline'} className='mt-3'>Let's Get Started</Button>
    </div>
  )
}

export default WelcomeBanner
