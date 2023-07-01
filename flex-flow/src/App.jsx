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
          <Input id="time" label="⏳ Time" menuItems={timeItems} />
          <Input id="exercise" label="🤸 Exercise" menuItems={exerciseItems} />
          <Input id="sets" label="🎯 Number of Sets" menuItems={setsItems} />
          <Input id="reps" label="🏋️ Number of Reps" menuItems={repItems} />
	  <p>Reps <span id="count">0</span></p>
          <button id="startBtn">😄 Start Exercise</button>
        </div>	
	<video className="input_video"></video>

	<div className="poseApp">
	    <canvas className="output_canvas" width="1280px" height="720px"></canvas>
	    <div className="progressBar">
	  	<h1>Progress</h1>
	  	<div>
	  		<h2>😊 Great job</h2>
		</div>
	  	<div>
			<h2><span id="sets_done">0</span> sets done!</h2>
		</div>
	    </div>
	</div>
	<div className="landmark-grid-container"></div>
      </div>
      <script src="/src/main.js"></script>
    </div>
  )
}

export default App
