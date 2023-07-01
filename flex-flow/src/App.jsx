<<<<<<< HEAD
import { useState } from 'react'
import Input from './components/Input';



=======
import { useState, useEffect } from 'react'
import Input from './components/Input';
>>>>>>> 43ffac5d9227a3c71deaf551d7e9e4c445f87e3c
import './App.css';

const App = () => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = "/src/main.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, []);

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
	<video className="input_video"></video>
	<canvas className="output_canvas" width="1280px" height="720px"></canvas>
	<div className="landmark-grid-container"></div>
      </div>
      <script src="/src/main.js"></script>
    </div>
  )
}

export default App
