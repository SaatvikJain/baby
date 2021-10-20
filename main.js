img="";
status="";
objects= [];

function setup()
{
    canvas= createCanvas(640, 420);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded); 
    document.getElementById("status").innerHTML = "Status :  Detecting Objects";
}

function preload()
{
    
}

function draw()
{
    image(video, 0, 0, 640, 420);
         if(status !="")
         {
            objectDetector.detect(video, gotResults);
             for(i = 0; i <objects.length; i++)
             {
                 document.getElementById("status").innerHTML = "Object Detected";
                 document.getElementById("objectn").innerHTML = " Baby Detected "
                 r= random(255);
                 g= random(255);
                 b= random(255);
                 fill(r, g, b);
                 accuracy = floor(objects[i].confidence*100);
                 label = objects[i].label;
                 width = objects[i].width; 
                 height = objects[i].height; 
                 x = objects[i].x;
                 y = objects[i].y;
                 text(label + " " + accuracy + " %",x,y);
                 noFill();
                 stroke(r, g, b);
                 rect(x,y,width,height);
             }
         }
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status= true;
    
}

function gotResults(error, results)
{
    if(error)
    {
        console.log(error);
    }
        console.log(results);
        objects= results;
}