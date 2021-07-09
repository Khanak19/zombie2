const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var ground,wall1,wall2,rightwall,leftwall,bridge;
var stones= []
var zombie

function preload(){
 zombie1 = loadImage("zombie1.png");
 zombie2 = loadImage("zombie2.png");
 zombie3 = loadImage("zombie3.png");
 zombie4 = loadImage("zombie4.png");

 backgroundImg = loadImage("background.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);
  ground = new Base(0,height-10,width*2,20);
  
   zombie = createSprite(width / 2, height - 110);
   zombie.addAnimation("lefttoright", zombie1, zombie2, zombie1);
   zombie.addAnimation("righttoleft", zombie3, zombie4, zombie3);
   zombie.scale = 0.1;
   zombie.velocityX = 10;

   breakButton = createButton("");
   breakButton.position(width-200,height/2-50);
   breakButton.class("breakbutton");
   breakButton.mousePressed(handleButtonPress);

   bridge = new Bridge(30, { x: 50, y: height / 2 - 140 });
   jointPoint = new Base(width - 250, height / 2 - 100, 40, 20);
 

  Matter.Composite.add(bridge.body,jointPoint);
  jointPoint = new Link(bridge,jointPoint)
  for (var i=0;i<=7;i++){
    var x = random(width/2-200,width/2+100)
    var y = random(-10,140);
    var stone = new Stone(x,y,50,50)
    stones.push(stone);
  }
}

function draw() {
  background(backgroundImg);
  Engine.update(engine);
  ground.show();
  bridge.show();
  for (var stone of stones){
    stone.show();
  }
  if (zombie.position.x >= width - 300) {
    zombie.velocityX = -10;
    zombie.changeAnimation("righttoleft");
  }

  if (zombie.position.x <= 300) {
    zombie.velocityX = 10;
    zombie.changeAnimation("lefttoright");
  }

  drawSprites();
}
function handleButtonPress(){
  jointPoint.detach();
  setTimeout(() => {
    bridge.break();
  },1500);
}