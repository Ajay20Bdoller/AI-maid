import React from 'react'


const questionList =[
'What skills do I need to become a data scientist?',
'How can I improve my resume for a tech job?',
'What are the best online courses for learning AI?',
'How do I prepare for a technical interview?',
'What programming languages should I learn for web development?'
]

function EmptyState({selectedQuestion}:any) {
  return (
    <div>
      <h2 className='font-bold text-xl text-center'>Ask anything to AI career Agent</h2>

      <div>
        {questionList.map((question, index) => (
          <h2 className='p-4 text-center border rounded-lg my-3 hover:border-primary' key={index} 
          onClick={()=>selectedQuestion(question)}>{question}</h2>
        ))}
      </div>
    </div>
  )
}

export default EmptyState
