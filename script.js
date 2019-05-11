var flock;
var dt=0.1;

function setup(){
  createCanvas(windowWidth*0.7, windowHeight,WEBGL);
  frameCount=0
  flock=new Flock(10,20,50,0.2,0.2,0.5,0.7,createVector(0,0,0),10,color(100,100,100),"cone");
  setupSliders();
  stroke(255);
  strokeWeight(0.3);
  //noStroke();

}

function windowResized() {
  resizeCanvas(windowWidth*0.7, windowHeight);
}

function draw(){
  frameCount++
  //orbitControl();
  background(color(186, 212, 255));
  //ambientLight(255);
  flock.draw();
  flock.update(dt);
  push()
  flock.goalPos=createVector(mouseX-width/2,mouseY-height/2,flock.goalPos.z)
  goalPosChangeDiv()
  //translate(mouseX-width/2,mouseY-height/2,0);
  //box(30)
  pop()
}

var valGoalPosDiv=document.getElementById("valGoalPosDiv")
var sliderGoalPosX=document.getElementById("sliderGoalPosX")
var sliderGoalPosY=document.getElementById("sliderGoalPosY")
var sliderGoalPosZ=document.getElementById("sliderGoalPosZ")


function goalPosChangeDiv(){
  valGoalPosDiv.innerHTML="Goal: "+flock.goalPos.x.toFixed(1)+", "+flock.goalPos.y.toFixed(1)+", "+flock.goalPos.z.toFixed(1)
  sliderGoalPosX.value=flock.goalPos.x;
  sliderGoalPosY.value=flock.goalPos.y;
  sliderGoalPosZ.value=flock.goalPos.z;
}

function setupSliders(){
  var sliderDt=document.getElementById("sliderDt")
  var valDtDiv=document.getElementById("valDtDiv")

  sliderDt.onchange=function(){
    valDtDiv.innerHTML="DT: "+this.value;
    dt=parseFloat(this.value);
  }
  sliderDt.onchange();



  var sliderMaxSpeed=document.getElementById("sliderMaxSpeed")
  var valMaxSpeedDiv=document.getElementById("valMaxSpeedDiv")

  sliderMaxSpeed.onchange=function(){
    valMaxSpeedDiv.innerHTML="Max Speed: "+this.value;
    flock.max_speed=parseFloat(this.value);
  }
  sliderMaxSpeed.onchange();



  var sliderDetectionRadius=document.getElementById("sliderDetectionRadius")
  var valDetectionRadiusDiv=document.getElementById("valDetectionRadiusDiv")

  sliderDetectionRadius.onchange=function(){
    valDetectionRadiusDiv.innerHTML="Detection Radius: "+this.value;
    flock.detectionRadius=parseFloat(this.value);
  }
  sliderDetectionRadius.onchange();



  var sliderSeparationFactor=document.getElementById("sliderSeparationFactor")
  var valSeparationFactorDiv=document.getElementById("valSeparationFactorDiv")

  sliderSeparationFactor.onchange=function(){
    valSeparationFactorDiv.innerHTML="Separation Factor: " +this.value;
    flock.separationFactor=parseFloat(this.value);
  }
  sliderSeparationFactor.onchange();




  var sliderVelocityMatchFactor=document.getElementById("sliderVelocityMatchFactor")
  var valVelocityMatchFactorDiv=document.getElementById("valVelocityMatchFactorDiv")

  sliderVelocityMatchFactor.onchange=function(){
    valVelocityMatchFactorDiv.innerHTML="Velocity Match Factor: "+this.value;
    flock.velocityMatchFactor=parseFloat(this.value);
  }
  sliderVelocityMatchFactor.onchange();





  var sliderCohesionFactor=document.getElementById("sliderCohesionFactor")
  var valCohesionFactorDiv=document.getElementById("valCohesionFactorDiv")

  sliderCohesionFactor.onchange=function(){
    valCohesionFactorDiv.innerHTML="Cohesion Factor: "+this.value;
    flock.cohesionFactor=parseFloat(this.value);
  }
  sliderCohesionFactor.onchange();






  sliderGoalPosX.onchange=function(){
    flock.goalPos.x=parseFloat(this.value);
    goalPosChangeDiv();
  }
  sliderGoalPosY.onchange=function(){
    flock.goalPos.y=parseFloat(this.value);
    goalPosChangeDiv();
  }
  sliderGoalPosZ.onchange=function(){
    flock.goalPos.z=parseFloat(this.value);
    goalPosChangeDiv();
  }
  sliderGoalPosX.onchange();
  sliderGoalPosY.onchange();
  sliderGoalPosZ.onchange();



  var sliderGoalFactor=document.getElementById("sliderGoalFactor")
  var valGoalFactorDiv=document.getElementById("valGoalFactorDiv")

  sliderGoalFactor.onchange=function(){
    valGoalFactorDiv.innerHTML="Goal Factor: "+this.value;
    flock.goalFactor=parseFloat(this.value);
  }
  sliderGoalFactor.onchange();


  var valColorDiv=document.getElementById("valColorDiv")
  var colorPicker=document.getElementById("colorPicker")

  colorPicker.onchange=function(){
    valColorDiv.innerHTML="Boid Color: "+this.value;
    flock.color=color(this.value);
  }
  colorPicker.onchange();

  var shapePicker=document.getElementById("shapePicker")

  shapePicker.onchange=function(){
    flock.shape=this.value;
  }
  shapePicker.onchange();


  var boidNumDiv=document.getElementById("boidNumDiv");
  var newBoidButton=document.getElementById("newBoidButton");

  boidNumDiv.innerHTML="Number of Boids: "+flock.boids.length;
  newBoidButton.onclick=function(){
      flock.newBoid();
      boidNumDiv.innerHTML="Number of Boids: "+flock.boids.length;
  }


}
