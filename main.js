input_value = "";
objects = [];
video = "";
status = "";
var synth = window.speechSynthesis;

function setup() {
    canvas = createCanvas(380, 280);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 280);
    video.hide();
}


function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    input_value = document.getElementById("object_name").value;
}

function modelLoaded() {
    console.log("modelLoaded");
    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}


function draw() {
    image(video, 0, 0, 480, 380);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            fill("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        

        if (objects[i].label == input_value) {
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("object_found").innerHTML = input_value + " found";
            utterThis = SpeechSynthesisUtterance(input_value + " found");
            speak(utterThis);
        }
        else {
            document.getElementById("object_found").innerHTML = input_value + " not found";
        }
        }
    }
}