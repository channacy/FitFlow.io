import { useState, useEffect } from 'react'
import Input from './components/Input';
import './App.css';

const App = () => {
  const timeItems = [
    { value: 1, label: '1 Minute' },
    { value: 10, label: 'Ten Minutes' },
    { value: 20, label: 'Twenty Minutes' },
    { value: 30, label: 'Thirty Minutes' },
  ];
  const exerciseItems = [
    { value: "bicep curl", label: 'Bicep Curl' },
  ];

  const setsItems = [
    { value: 2, label: '2' },
  ];

  const repItems = [
    { value: 1, label: '1' },
    { value: 5, label: '5' },
    { value: 6, label: '6' },
    { value: 7, label: '7' },
  ];



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
          <Input label="⏳ Time" menuItems={timeItems} />
          <Input label="🤸 Exercise" menuItems={exerciseItems} />
          <Input label="🎯 Number of Sets" menuItems={setsItems} />
          <Input label="🏋️ Number of Reps" menuItems={repItems} />
          <button id="startBtn">😄 Start Exercise</button>
        </div>	
	<video className="input_video"></video>

	<canvas className="output_canvas" width="1600px" height="900px"></canvas>
	<div className="landmark-grid-container"></div>
      </div>
      <script src="/src/main.js"></script>
    </div>
  )
}

export default App
