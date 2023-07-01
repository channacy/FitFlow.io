import { useState } from 'react'
import Input from './components/Input';



import './App.css';

const App = () => {

  return (
    <div className="App">
      
      <div>
        <h1 className="header">Fit-Flow</h1>
        <div className="inputContainer">
          <Input label="Time"/>
          <Input label="Exercise"/>
          <Input label="Number of Sets"/>
          <Input label="Number of Reps"/>
          <button id="startBtn">Start Exercise</button>
        </div>
  

      </div>
      
   
     

      
    </div>
  )
}

export default App