import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {

  const {onSent, recentPrompt,showResult,setLoading, loading, resultData,setResultData ,setInput, input} = useContext(Context)

  return (
    <div className='main'>
      <div className='nav'>
       <p>Gemini</p>
       <img src={assets.user_icon} alt='gemini logo' />

      </div>
      <div className='main__content'>


      {!showResult
      ?
      <>
      <div className='greet'>
          <p><span>Hello, Shiven</span></p>
          <p>How can I help you today?</p>
       </div>
       <div className='cards'>
          <div className='card'>
            <p>Look up a Linux shell command for a specific task</p>
            <img src={assets.code_icon} alt='code icon' />
          </div>
          <div className='card'>
            <p>Outline a way to home routine: organizing my closet</p>
            <img src={assets.compass_icon} alt='compass icon' />
          </div>
          <div className='card'>
            <p>Outline a way to home routine: organizing my closet</p>
            <img src={assets.bulb_icon} alt='bulb icon' />
          </div>
          <div className='card'>
            <p>Suggest the best parks to visit in a city with descriptions</p>
            <img src={assets.compass_icon} alt='compass icon' />
          </div>
       </div>

      </>
      :
      <div className='result'>
           <div className='result-title'>
                <img className='user' src={assets.user_icon} alt='message icon' />
                <p>{recentPrompt}</p>
           </div>
           <div className='result-data'>
             <img className='logo' src={assets.gemini_icon} />
             {
              loading?
              <div className='loader'>
                   <hr/>
                   <hr/>
                   <hr/>
              </div>:
              <p dangerouslySetInnerHTML={{__html:resultData}} ></p>
             }
             
           </div>
      </div>}
       
       <div className='main-bottom'>
          <div className='search-box'> 
          <input onChange={(e)=>setInput(e.target.value)} value={input} type='text' placeholder='Input a prompt here' ></input>
           <div>
            <img src={assets.gallery_icon} alt='gallery icon' />
            <img src={assets.mic_icon} alt='mic icon' />
            <img onClick={()=>onSent()} src={assets.send_icon} alt='send icon' />
           </div>
          </div>
          <p className='bottom-info'>
          Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
          </p>
       </div>
      </div>

    </div>
  )
}

export default Main