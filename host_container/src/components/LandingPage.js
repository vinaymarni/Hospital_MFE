import React from 'react';
import "../styles/landingPage.css"
import Button from '../commonElements/Button';
import { tabsData } from '../staticData/commonData';

function FirstBlock() {
  return (
    <div className='landingPageFirstBlock'>
        <div className='landingPageLeftSidePart'>
            <h1>Empowering You to Live Healthy Life</h1>
            <p>We are commited to delivery exceptions outcomes for our patients, everytime, through a combination of medical expertise and cutting edge techlology</p>
            <Button 
              onSubmit={()=>("")}
              title="Book Appointment"
              buttonClassName="appointmentBtn"
            />
        </div>

        <div className='landingPageRightSidePart'>

        </div>
        
      </div>
  )
};

const TabsBlock = () => {
  return(
    <div className='TabsBlockMainCon'>
      {tabsData.map((eachData, index)=>{
        return(
          <div key={`tab_${index.toString()}`} className='tabCard'>
            <h3>{eachData.title}</h3>
          </div>
        )
      })}
    </div>
  )
};


function LandingPage() {
  return (
    <div className='landingPageMainCon'>
      <FirstBlock />
      <TabsBlock />
    </div>
  )
}

export default LandingPage