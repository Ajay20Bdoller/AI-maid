"use client";

import { Button } from '@/components/ui/button'
import Link from 'next/link' 
import { v4 as uuidv4 } from 'uuid';

import React from 'react'
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';




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
  const id=uuidv4();
const {user} =useUser();
const router= useRouter();

const onClickButton = async ()=>{
  //Create New record to History Table
  const result = await axios.post('/api/history', {
    recordId:id,
    content:[]
  });
console.log(result);
router.push(tool.path+"/"+id);





}


  return (
    <div className='p-5 border rounded-xl hover:shadow-lg transition-all duration-300'>
    <img src={tool.icon} width={40} height={40} alt={tool.name}/>   
<h2 className='font-bold mt-3'>{tool.name}</h2>
<p className='text-gray-400'>{tool.desc}</p>
<Link href={tool.path+"/" +id} className="w-full">
<Button className='w-full mt-3'
onClick={onClickButton}
>{tool.button}</Button>
</Link>

    </div>
  )
}

export default AiToolCard
