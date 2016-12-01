window.addEventListener('load', function ( event ) {


  function Circle( centerX, centerY, radius){
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
    this.draw = function(){
      ct.strokeStyle = colorPallet.value;
      ct.beginPath();
      ct.arc(this.centerX, this.centerY, this.radius, 0, 2*Math.PI)
      ct.stroke();
      ct.closePath();
      addToDrawings();
      temporaryArray = [];
      };
}

function Triangle( x1, y1, x2, y2, x3, y3 ){
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
    this.draw = function (){
      ct.beginPath();
      ct.strokeStyle = colorPallet.value;
      ct.moveTo(this.x1, this.y1);
      ct.lineTo(this.x2, this.y2);
      ct.lineTo(this.x3, this.y3);
      ct.closePath();
      ct.stroke();
      ct.closePath();
      addToDrawings();
      temporaryArray = [];
      
    }
}

function Rectangle( x1, y1, x2, y2, x3, y3, x4, y4) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x1;
    this.y3 = y2;
    this.x4 = x2;
    this.y4 = y1;
    this.draw = function (){
      ct.strokeStyle = colorPallet.value;
      ct.beginPath();
      ct.moveTo(this.x1, this.y1);
      ct.lineTo(this.x4, this.y4);
      ct.lineTo(this.x2, this.y2);
      ct.lineTo(this.x3, this.y3);
      ct.lineTo(this.x1, this.y1);
      ct.stroke();
      ct.closePath();
      addToDrawings();
      temporaryArray = [];
    }

}


  let saveDrawings = [];
  let temporaryArray = [];
  let circleUsed = false;
  let triangleUsed = false;
  let rectangleUsed = false;
  let colorUsed = false;
  let type = ''; 
  
  let canvas = document.getElementsByTagName('canvas')[0];
  let ct = canvas.getContext('2d');
  let xposition = document.getElementById('xposition');
  let status = document.getElementById('status');
  let chooseColor = document.getElementById('choosecolor');
  let pickColor = document.getElementById('pickcolor');
  let colorPallet = document.getElementById('colorpallet');
  let hex = document.getElementById('hex');
  let json = document.getElementById('json');
  let textruta = document.getElementById('textruta');
  
  pickColor.addEventListener('change', function (event){
    if(pickColor.value != 'choose'){
      colorPallet.value = pickColor.value;
    }
  });
  
  chooseColor.addEventListener('click', function (event){
    //colorPallet.value = hex.value;
    if(hex.value.length === 7){
      if(isValidHex(hex.value) == true){
        colorPallet.value = hex.value;
        let newColor = document.createElement('option');
        pickColor.appendChild(newColor);
        newColor.innerHTML = hex.value;
        newColor.style.backgroundColor = hex.value;
      }
    }
  });
 
  function isValidHex (text){
  text = text.toUpperCase();
    let array = ['A','B','C','D','E','F','0','1','2','3','4','5','6','7','8','9'];
    let count = 0;
    if (text.charAt(0) == '#') {
        for (let i=1; i<7; i++) {
            for (let j=0; j<array.length; j++) {
                if(text.charAt(i) == array[j]) {
                    count++;
                    break;}}}}
    if (count == 6) {
        return true;}
    else {
        return false;}
};
  

function getMousePos(canvas, event) {
  let rect = canvas.getBoundingClientRect();
   return{
      x: event.x - rect.left,
      y: event.y - rect.top
    };
}
  
 

let menu = document.getElementById('menu');
let myDropdown = document.getElementById('myDropdown');
myDropdown.style.display = 'none';

menu.addEventListener('click', function (event){
  if(myDropdown.style.display == 'none'){
    myDropdown.style.display = 'block';
  } else {
    myDropdown.style.display = 'none';
  }
});
 


let radius = function(length){
  let a = Math.pow((temporaryArray[0].x - temporaryArray[1].x), 2);
  let b = Math.pow((temporaryArray[0].y - temporaryArray[1].y), 2);
		return Math.sqrt(a + b);   
};

let clearcanvasbtn = document.getElementById('clearcanvasbtn');
clearcanvasbtn.addEventListener('click',function (event){
  myDropdown.style.display = 'none';  
  ct.clearRect(0, 0, canvas.width, canvas.height);
  temporaryArray = [];
  triangleUsed = false;
  rectangleUsed = false;
  circleUsed = false;
  status.innerHTML = 'status: Välj en figur';
  saveDrawings = [];
});

let buttonCirkel = document.getElementById('cirkelbtn'); 

  buttonCirkel.addEventListener('click',function(event){
  myDropdown.style.display = 'none';
  type = 'cirkel';
  temporaryArray = [];
  status.innerHTML = 'status: sätt ut 1 mittpunkt';
  circleUsed = true;
  rectangleUsed = false;
  triangleUsed = false;
});

let buttonTriangle = document.getElementById('trianglebtn');
buttonTriangle.addEventListener('click', function(event){
  myDropdown.style.display = 'none';
  type = 'triangle';
  temporaryArray = [];
  status.innerHTML = 'status: sätt ut 3 punkter'; 
  triangleUsed = true;
  circleUsed = false;
  rectangleUsed = false;
});
                                
let buttonRectangle = document.getElementById('rectanglebtn');
buttonRectangle.addEventListener('click', function(event){
  myDropdown.style.display = 'none';
  type = 'rectangle'
  temporaryArray = [];
  status.innerHTML = 'status: sätt ut 2 punkter'
  rectangleUsed = true;
  circleUsed = false;
  triangleUsed = false;
});

canvas.addEventListener('click', function(event){
  let getPosition = getMousePos(canvas, event);
  temporaryArray.push(getPosition); 
  if(circleUsed === true){
    console.log('ab');
    if(temporaryArray.length === 1){
      status.innerHTML = 'status: sätt ut en radius'
      } 
    else {
        let r = radius();
        let c = new Circle(temporaryArray[0].x, temporaryArray[0].y, r);
        c.draw();
        temporaryArray = [];
        status.innerHTML = 'status: klar';
      }
    }
    if(rectangleUsed === true){
      if(temporaryArray.length === 1){
        status.innerHTML = 'status: sätt ut 1 punkt till';
      } else {
        let r = new Rectangle(temporaryArray[0].x, temporaryArray[0].y, temporaryArray[1].x, temporaryArray[1].y);
        r.draw();
        status.innerHTML = 'status: klar';
        temporaryArray = [];
      }
    }
    if(triangleUsed === true){
      if(temporaryArray.length === 1){
        status.innerHTML = 'status: sätt ut 2 punkter till';
      } else if(temporaryArray.length === 2){
        status.innerHTML = 'status: sätt ut 1 punkter till';
      } else {
       let t = new Triangle(temporaryArray[0].x, temporaryArray[0].y, temporaryArray[1].x, temporaryArray[1].y, temporaryArray[2].x, temporaryArray[2].y);
        t.draw();
        status.innerHTML = 'status: klar';
        temporaryArray = [];
      }
    }  
});

  canvas.addEventListener('mousemove', function (event){
    let mousehover = getMousePos(canvas, event);
    xposition.innerHTML = 'X: ' + mousehover.x;
    yposition.innerHTML = 'Y: ' + mousehover.y;
    
  });
  
  json.addEventListener('click', function (event){
     let json = JSON.stringify(saveDrawings);
      textruta.innerHTML = json;
  });

function addToDrawings(){
  let newDrawing = {
  cordinater: temporaryArray,
  color: colorPallet.value,
  type: type
  };
  saveDrawings.push(newDrawing);
 }
    
  
});