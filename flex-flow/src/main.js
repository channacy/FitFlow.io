const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');

let stage = "down";
let counter = 0;
let start = false;
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

camera.start();
