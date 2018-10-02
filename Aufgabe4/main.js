var context = new AudioContext();
var pads = document.getElementsByClassName("pad");
var sounds = [];

function playSound(value) {
    sounds[value].play()
}

for (let i=0; i < pads.length; i++) {
    sounds[i] = new Audio("sounds/sound"+(i+1)+".wav");
    var soundNode = context.createMediaElementSource(sounds[i]);
    var gainNode = context.createGain();
    gainNode.gain.value = 0.8;

    soundNode.connect(gainNode);
    gainNode.connect(context.destination);
    
    pads[i].addEventListener("mousedown", function() {
        playSound(i)
    });

}
