import { AirVent } from 'lucide-react'
import React from 'react'

const aiToolsList=[
  {
name: 'AI Career Q&A Chat',
desc:'Chat with AI Agent',
icon:'/chatbot.png',
button: 'Lets Chat',
path : '/ai-chat'

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
path : '/ai-chat'

},


  {
name: 'Cover Letter Generator',
desc:'Generate a cover letter',
icon:'/cover-letter.png',
button: 'Generate Now',
path : '/ai-chat'

},



]

function AiTools() {
  return (
    <div className='mt-7 bg-white border rounded-xl'>
      <h2 className='font-bold text-xl'>Available AI Tools</h2>
      <p>Smart Building and  Shape Your Creer with this...</p>

<div>
  {aiToolsList.map((tool, index) => (
    <AiTools key={index} tool={tool} />
  ))}
</div>

    </div>
  )
}

export default AiTools
