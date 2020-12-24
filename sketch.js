var dog,happyDog,database,foodS,foodStock,dogPic;
function preload()
{
  dogPic = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  dog = createSprite(250,250,20,20);
  dog.addImage(dogPic);
  dog.scale=0.5;
  database =  firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
}


function draw() {  
  background(46,139,87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  if(foodS===20){
    textSize(20);
    fill ("blue");
    stroke(2);
    textSize(15);
    text("Press UP_ARROW to feed your pet",5,100);
  }
  if(foodS===0){
    dog.addImage(dogPic);
  }
  textSize(20);
  fill ("blue");
  stroke(2);
  textSize(15);
  text("Food left: "+foodS,10,50);

  drawSprites();
  //add styles here

}
function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}



