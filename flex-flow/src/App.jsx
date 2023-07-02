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

let start = false;

  useEffect(() => {
const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');

let stage = "down";
let counter = 0;
let sets = 0;

function onResults(results) {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

  // Only overwrite existing pixels.
  canvasCtx.globalCompositeOperation = 'source-in';
  canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);

  // Only overwrite missing pixels.
  canvasCtx.globalCompositeOperation = 'destination-atop';
  canvasCtx.drawImage(
      results.image, 0, 0, canvasElement.width, canvasElement.height);

  canvasCtx.globalCompositeOperation = 'source-over';
  drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS,
                 {color: '#00FF00', lineWidth: 4});
  drawLandmarks(canvasCtx, results.poseLandmarks,
                {color: '#FF0000', lineWidth: 2});

  if (results.poseLandmarks && start) {
	  const shoulder = results.poseLandmarks[11];
	  const elbow = results.poseLandmarks[13];
	  const wrist = results.poseLandmarks[15];
	  if (shoulder.visibility > 0.9 && elbow.visibility > 0.9 && wrist.visibility > 0.9) {
		  const v1 = {x: shoulder.x - elbow.x, y: shoulder.y - elbow.y, z: shoulder.z - elbow.z};
		  const v2 = {x: wrist.x - elbow.x, y: wrist.y - elbow.y, z: wrist.z - elbow.z};

		  const angle = Math.atan2(v1.y, v1.x) - Math.atan2(v2.y, v2.x);
		  const degrees = Math.abs(angle * 180 / Math.PI);
		  console.log(stage);
		  if (degrees > 140) {
		    stage = "down"
		  }
		  else if (degrees < 50 && stage == "down") {
			stage = "up";
			++counter;
			if (document.getElementById("reps").innerHTML == counter) {
			   counter = 0;
			   document.getElementById("sets_done").innerHTML = ++sets;
			}
			if (document.getElementById("sets").innerHTML == sets) {
			   console.log("workout complete!");
			}

			document.getElementById("count").innerHTML = counter;
		  }
	  }
  }
  canvasCtx.restore();
}

const pose = new Pose({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
}});
pose.setOptions({
  modelComplexity: 1,
  smoothLandmarks: true,
  enableSegmentation: true,
  smoothSegmentation: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});
pose.onResults(onResults);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await pose.send({image: videoElement});
  },
  width: 1280,
  height: 720
});

const button = document.getElementById("startBtn");
button.addEventListener('click', (e) => {
  start = true;
})


camera.start();
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
      <script src="%PUBLIC_URL%/main.js"></script>
    </div>
  )
}

export default App
