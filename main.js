video = "";
status2 = "";
objects = [];
status3 = "";
function preload()
{
    video = createVideo("video.mp4");
    video.hide();
}
function setup()
{
    canvas = createCanvas(500,400);
    canvas.center();
}
function detect_video()
{
    object_detector = ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("status").innerHTML = "detecting object";
    status3 = "done";
}
function modelloaded()
{
    status2 = true;
    object_detector.detect(video, gotresult);
    video.loop();
    video.speed(1);
    video.volume(0);
}
function draw()
{
    if(status3 == "done")
    {
    image(video, 0, 0, 500, 400);
    if(status2 != "")
    {
        object_detector.detect(video, gotresult);
        for(i=0; i<objects.length; i++)
        {
           object_name =  objects[i].label;
           height = objects[i].height;
           width = objects[i].width;
           confidence = Math.floor(objects[i].confidence*100);
           x = objects[i].x;
           y = objects[i].y;
           fill("red");
           stroke("red")
           strokeWeight(2);
           textSize(21)
           text(object_name +" "+confidence+"%", x+15, y+15);
           noFill();
           strokeWeight(4);
           rect(x, y, width, height);

           document.getElementById("status").innerHTML = "Object Detected";
           document.getElementById("num_object").innerHTML = objects.length;
        }
    }
    }
}
function gotresult(error, results)
{
    if(error)
    {
        window.alert("there was an error occured try reloading it or wait for some time")
        object_detector.detect(video, gotresult);
    }
    else
    {
        console.log(results);
        objects = results;

    }
}
