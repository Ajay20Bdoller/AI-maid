"use client"

import { Button } from '@/components/ui/button';
import React, { useState } from 'react'

function History() {

  const [userHistory, setUserHistory] = useState([]);
  return (
    <div className='mt-5 p-5 border rounded-xl'>
      <h2 className='font-bold text-lg'>Previous History</h2>
      <p>What You Previously worked on, You can find here</p>

{userHistory?.length == 0&&
<div className='flex items-center justify-center mt-5 flex-col mt-6'>
  <img src={'/bulb.png'} alt='bulb'
    width={60}
    height={50}
  />
  <h2>You do not have any previous history.</h2>
  <Button className='mt-5 hover:bg-blue-500'>Explore AI Tools</Button>
</div>
}
    </div>
  )
}

export default History
