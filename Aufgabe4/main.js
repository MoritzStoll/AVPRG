var context = new AudioContext();
var gainNode = context.createGain();
gainNode.gain.value = 0.8;

gainNode.connect(context.destination);
    

var pads = document.getElementsByClassName("pad");
var sounds = [];



function playSound(i) {
    var sourceBuffer = context.createBufferSource();
    sourceBuffer.buffer = sounds[i];
    sourceBuffer.connect(gainNode);
    sourceBuffer.start(0);
}

for (let i=0; i < pads.length; i++) {
    getData(i);
    
    pads[i].addEventListener("mousedown", function() {
        playSound(i)
    });

}



function getData(i) {
    var request = new XMLHttpRequest();
    request.open("GET", "sounds/sound"+(i+1)+".wav", true);
    request.responseType = 'arraybuffer';
    request.onload = function() {
        var undecodedAudio = request.response;
        context.decodeAudioData(undecodedAudio, function(buffer) {
            sounds[i] = buffer;
        });
    };
    request.send();
}
