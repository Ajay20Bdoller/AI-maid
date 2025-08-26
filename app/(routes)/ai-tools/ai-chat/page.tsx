"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send } from 'lucide-react'
import React, { useState } from 'react'
import EmptyState from '@/app/(routes)/ai-tools/_components/EmptyState';

import Link from 'next/link'
import axios from 'axios'

function AiChat() {

  const [userInput, setUserInput] = useState<string>();
const [loading, setLoading]=useState(false);

const onSend=async()=>{
  setLoading(true);



const result=await axios.post('/api/ai-career-chat-agent',{
  userInput:userInput
});

console.log(result.data);
setLoading(false);
}
  return (
    <div className='px-10 md:px-24 lg:px-36 xl:px-48'>
      <div className='flex items-center justify-between gap-8'>
      <div>
      <h2 className='font-bold text-lg'>AI Career Q&A Chat</h2>
      <p>Smarter career decisions start here - get tailored adivice, real time market insights</p>
</div>
<Link href='/ai-tools/ai-chat'>
<Button>+ New Chat</Button>
</Link>
    </div>
    <div className='flex flex-col h-[75vh]'>
    <div className='mt-5'>
      {/* empty state operation */}
      <EmptyState selectedQuestion={(question:string) => setUserInput(question) } />
    </div>

    <div className='flex-1'>
      {/* message list */}
    </div>

    <div className='flex justify-between items-center'>
{/* input field  */}
<Input placeholder='Type your message here...' value={userInput} onChange={(e) => setUserInput(e.target.value)} />
<Button onClick={onSend} disabled={loading}><Send /></Button>
    </div>
      </div>
    </div>
  )
}

export default AiChat
