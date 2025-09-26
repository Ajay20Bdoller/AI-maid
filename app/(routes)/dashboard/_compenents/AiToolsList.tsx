import { AirVent } from 'lucide-react'
import React from 'react'
import AiToolCard from './AiToolCard'

export const aiToolsList=[
  {
name: 'AI Career Q&A Chat',
desc:'Chat with AI Agent',
icon:'/chatbot.png',
button: "Lets Chat",
path : '/ai-tools/ai-chat'

},

  {
name: 'AI Resume Analyzer',
desc:'Enhance your resume',
icon:'/resume.png',
button: 'Analyze Now',
path : '/ai-chat'

},


  {
name: 'Career Roadmap Generator',
desc:'Find your roadmap',
icon:'/roadmap.png',
button: 'Generate Now',
path : '/ai-tools/ai-roadmap-agent'

},


  {
name: 'Cover Letter Generator',
desc:'Generate a cover letter',
icon:'/cover.png',
button: 'Generate Now',
path : '/ai-chat'

},



]

function AiToolsList() {
  return (
    <div className='mt-7 bg-white border rounded-xl'>
      <h2 className='font-bold text-xl'>Available AI Tools</h2>
      <p>Smart Building and  Shape Your Creer with this...</p>

<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
  {aiToolsList.map((tool:any, index) => (
    <AiToolCard tool={tool} key={index} />
  ))}
</div>

    </div>
  )
}

export default AiToolsList
 