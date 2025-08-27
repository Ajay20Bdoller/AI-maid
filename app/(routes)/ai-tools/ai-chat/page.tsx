"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoaderCircle, Send } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import EmptyState from '@/app/(routes)/ai-tools/_components/EmptyState';

import Link from 'next/link'
import axios from 'axios'

type messages={
  content:string,
  role:string,
  type:string
}


function AiChat() {

  const [userInput, setUserInput] = useState<string>('');
const [loading, setLoading]=useState(false);
const [messageList, setMessageList] = useState<messages[]>([{
  content:'User Msg',
  role:'user',
  type:'text'
},
{
  content:'Assistant Msg',
  role:'assistant',
  type:'text'
}
]);



const onSend=async()=>{
  setLoading(true);
  setMessageList(prev=> [...prev,{
    content:userInput,
    role:'user',
    type:'text'
  }])



const result=await axios.post('/api/ai-career-chat-agent',{
  userInput:userInput
});

console.log(result.data);
  setMessageList(prev=>[...prev,result.data])
setLoading(false);
}

console.log(messageList);

useEffect(()=>{
  //same mesg into DB

},[messageList])





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
    <div className='flex flex-col h-[75vh]'> {messageList?.length <=0 &&
    <div className='mt-5'>
      {/* empty state operation */}
      <EmptyState selectedQuestion={(question:string) => setUserInput(question) } />
    </div>}

    <div className='flex-1'>
      {/* message list */}
      {messageList?.map((message, index)=>(
        <div>
        <div key={index} className={`flex mb-2 ${message.role=='user'?'justify-end':'justify-start'}`}>
          <div className={`p-3 rounded-lg gap-2 ${message.role=='user'?'bg-gray-200 text-black rounded-lg':'bg-gray-50 text-black'}`}>
            {message.content}
            </div>
            </div>
          <div className='flex justify-start p-3 rounded-lg gap-2 bg-gray-50 text-black mb-2'>
{loading&&messageList?.length-1==index && <LoaderCircle className='animate-spin'/>}
          {message.content}
        </div>
        </div>
      ))}
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
