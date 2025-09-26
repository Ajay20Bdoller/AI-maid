import React from 'react'
import WelcomeBanner from './_compenents/WelcomeBanner'
import AiTools from './_compenents/AiToolsList'
import History from './_compenents/History'

function Dashboard() {
    return (
        <div>
            <WelcomeBanner/>
            <AiTools/>
            <History/>
        </div>
    )
}

export default Dashboard