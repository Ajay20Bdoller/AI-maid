import { PricingTable } from '@clerk/nextjs'
import React from 'react'

function Billing() {
  return (
    <div>
      <h2 className='font-bold text-3xl text-center'>Choose Your Plan</h2>
      <p className='text-lg text-center'>Select a Subscription bundle .....</p>
      <div className='mt-8 hover:scale-105'>
      <PricingTable />
      </div>
    </div>
  )
}

export default Billing

