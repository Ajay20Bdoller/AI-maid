import { Button } from '@/components/ui/button'
import Link from 'next/link' 

import React from 'react'

interface TOOL{
  name: string,
  desc: string,
  icon:string,
  button:string,
  path:string
}

type AiToolCardProps = {
  tool: TOOL
}

function AiToolCard({tool}: AiToolCardProps) {
  return (
    <div className='p-5 border rounded-xl hover:shadow-lg transition-all duration-300'>
    <img src={tool.icon} width={40} height={40} alt={tool.name}/>   
<h2 className='font-bold mt-3'>{tool.name}</h2>
<p className='text-gray-400'>{tool.desc}</p>
<Link href={tool.path} className="w-full">
<Button className='w-full mt-3'>{tool.button}</Button>
</Link>

    </div>
  )
}

export default AiToolCard
