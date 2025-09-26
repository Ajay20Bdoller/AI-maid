import React from 'react'
import AiToolsList from "../dashboard/_compenents/AiToolsList";
import WelcomeBanner from '../dashboard/_compenents/WelcomeBanner';



function AiTools() {
  return (
    <div>
      <WelcomeBanner/>
      <h2 className='font-bold text-2xl mt-5'>AI maid</h2>
      <AiToolsList/>
    </div>
  )
}

export default AiTools

