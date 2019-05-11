function clamp(val,min,max){
  return min(max(val,min),max);
}

class Flock{
  constructor(num,startingRadius,detectionRadius,separationFactor,velocityMatchFactor,cohesionFactor,goalFactor,goalPos,max_speed,color,shape){
    this.boids=[]
    this.startingRadius=startingRadius;
    this.color=color;
    this.shape=shape;
    for(let i=0;i<num;i++){
      this.newBoid();
    }
    this.max_speed=max_speed
    this.detectionRadius=detectionRadius;
    this.separationFactor=separationFactor;
    this.velocityMatchFactor=velocityMatchFactor;
    this.cohesionFactor=cohesionFactor;
    this.goalFactor=goalFactor;
    this.goalPos=goalPos;
    this.showGoal=true;
  }
  draw(){
    if(this.showGoal){
      push()
      fill(255,0,0,50);
      stroke(200,100,100)
      translate(this.goalPos);
      sphere(10);
      pop()
    }
    for(let i=0;i<this.boids.length;i++){
      this.boids[i].draw(this.color,this.shape);
    }
  }

  newBoid(){
    this.boids.push(new Boid(this.boids.length,random(-this.startingRadius/2,this.startingRadius/2),random(-this.startingRadius/2,this.startingRadius/2),random(-this.startingRadius/2,this.startingRadius/2)))
  }

  update(dt){
    let oldPos=[]
    let oldVel=[]
    for(let i=0;i<this.boids.length;i++){
      oldPos[i]=this.boids[i].pos;
      oldVel[i]=this.boids[i].vel;
    }
    for(let i=0;i<this.boids.length;i++){
      this.boids[i].pos.add(p5.Vector.mult(this.boids[i].vel,dt));
      let curBoid=this.boids[i];
      let boidsNear=0;
      let separationVector=createVector(0,0,0);
      let velocityMatchVector=createVector(0,0,0);
      let cohesionVector=createVector(0,0,0);

      for(let j=0;j<this.boids.length;j++){
        if(i!=j){
          let dist=p5.Vector.sub(curBoid.pos,oldPos[j])
          if(dist.mag()<=this.detectionRadius){
            boidsNear++;
            separationVector.add(p5.Vector.sub(curBoid.pos,oldPos[j]));
            velocityMatchVector.add(oldVel[j]);
            cohesionVector.add((oldPos[j]))
          }
        }
      }
      if(boidsNear>0){
        separationVector.normalize().mult(this.separationFactor);
        velocityMatchVector.normalize().mult(this.velocityMatchFactor);
        cohesionVector.normalize().mult(this.cohesionFactor);
        this.boids[i].vel.add(separationVector);
        this.boids[i].vel.add(velocityMatchVector);
        this.boids[i].vel.add(cohesionVector);
      }
      this.boids[i].vel.add(p5.Vector.sub(this.goalPos,this.boids[i].pos).normalize().mult(this.goalFactor));
      if(abs(this.boids[i].vel.mag())>this.max_speed*dt){
        this.boids[i].vel.normalize().mult(this.max_speed*dt);
      }

    }
  }
}

class Boid{
  constructor(id,x,y,z){
    this.id=id;
    this.pos=createVector(x,y,z);
    this.vel=createVector(0,0,0);
    //console.log("New boid "+this.id+" at "+this.pos+"!")
  }
  draw(color,shape){
    push()
    fill(color)
    translate(this.pos);
    //rotateX(90);
    rotateX(createVector(0,1,0).angleBetween(this.vel));
    rotateY(createVector(0,0,1).angleBetween(this.vel));
    rotateZ(createVector(-1,0,0).dot(this.vel));
    switch(shape){
      case "cone":
        cone(5,10);
        break;
      case "sphere":
        sphere(5,10,10);
        break;
      default:
        box(10);
        break;
    }
    pop()
  }
}
