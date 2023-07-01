import { useState } from 'react'
import Input from './Components/Input';



import './App.css';

const App = () => {

  return (
    <div className="App">
      
      <div>
        <h1 className="header">Fit-Flow</h1>
        <div className="inputContainer">
          <Input />
          <Input />
          <Input />
          <Input />
          <button id="startBtn">Start Exercise</button>
        </div>
  

      </div>
      
   
     

      
    </div>
  )
}

export default App