import { useState, useEffect } from 'react'
import Input from './components/Input';
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
          <Input />
          <Input />
          <Input />
          <Input />
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
