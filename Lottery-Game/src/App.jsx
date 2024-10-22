import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Lottery from './Lottery'
import { Sum } from './Random'


function App() {
   let winCondition = (ticket)=>{
      return Sum(ticket)===15;
   }

  return (
    <>
      <Lottery n={3} winCondition={winCondition}/>
    </>
  )
}

export default App
