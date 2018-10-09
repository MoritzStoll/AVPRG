var context = new AudioContext();

var analyser = context.createAnalyser();
var oscillatorNode = context.createOscillator();
var gainNode = context.createGain();

oscillatorNode.connect(analyser);
analyser.connect(gainNode)
gainNode.connect(context.destination);

gainNode.gain.value = 0.3;
oscillatorNode.frequency.value = 880;

oscillatorNode.start(context.currentTime);

analyser.fftSize = 2048;
var bufferLength = analyser.frequencyBinCount; 
var dataArray = new Uint8Array(bufferLength);


var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

document.body.addEventListener('mousemove', function(e){
    gainNode.gain.value = 1 - (e.clientY/ctx.canvas.height);
    oscillatorNode.frequency.value = e.clientX * (window.innerWidth / 2000) + 60;
    console.log(1- e.clientY / ctx.canvas.height)
   
});

ctx.clearRect(0, 0, window.innerWidth, ctx.canvas.height);

function draw() {
    drawVisual = requestAnimationFrame(draw);
    analyser.getByteTimeDomainData(dataArray);
    
    ctx.fillStyle = '#233b60';
    ctx.fillRect(0, 0, window.innerWidth, ctx.canvas.height);
    ctx.lineWidth = 10;
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    var sliceWidth = window.innerWidth * 5 / bufferLength;
    var x = 0;

    for(var i = 0; i < bufferLength; i++) {
   
        var v = dataArray[i] / 128.0;
        var y = v * ctx.canvas.height/7;

        if(i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
    }

    ctx.lineTo(canvas.width, canvas.height/2);
    ctx.stroke();
    
}
draw()


