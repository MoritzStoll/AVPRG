var context = new AudioContext();

var analyser = context.createAnalyser();
var oscillatorNode = context.createOscillator();
var oscillatorNode2 = context.createOscillator();
var oscillatorNode3 = context.createOscillator();
var gainNode = context.createGain();




oscillatorNode.connect(gainNode);
oscillatorNode2.connect(gainNode);
oscillatorNode3.connect(gainNode);
gainNode.connect(analyser);
analyser.connect(context.destination);

gainNode.gain.value = 0.3;
oscillatorNode.frequency.value = 880;
oscillatorNode2.frequency.value = oscillatorNode.frequency.value - 100;
oscillatorNode3.frequency.value = oscillatorNode2.frequency.value - 100;



oscillatorNode.start(context.currentTime);
oscillatorNode2.start(context.currentTime);
oscillatorNode3.start(context.currentTime);


analyser.fftSize = 2048;
var bufferLength = analyser.frequencyBinCount; 
var dataArray = new Uint8Array(bufferLength);


var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;




document.body.addEventListener('mousemove', function(e){
    gainNode.gain.linearRampToValueAtTime(1, context.currentTime);
    gainNode.gain.value = 1 - (e.clientY/ctx.canvas.height + 1);
    gainNode.gain.linearRampToValueAtTime(0, context.currentTime + 4);
    
    



    oscillatorNode.frequency.linearRampToValueAtTime((e.clientX / window.innerWidth * 2000) + 20, context.currentTime + 1)
    oscillatorNode2.frequency.linearRampToValueAtTime((oscillatorNode.frequency.value - 100), context.currentTime + 2)
    oscillatorNode3.frequency.linearRampToValueAtTime((oscillatorNode2.frequency.value - 100), context.currentTime + 3)

    
    oscillatorNode.detune.linearRampToValueAtTime(400, context.currentTime)
    oscillatorNode.detune.linearRampToValueAtTime(0, context.currentTime + 1)
    
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
        var y = v * ctx.canvas.height/7 + (window.innerHeight/2 - (ctx.canvas.height/7)/2 );

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


