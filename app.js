'use strict';

var imagePaths = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];


for (var i = 0; i < imagePaths.length; i++){
  var name = imagePaths[i];
  new Image(null, name);
}

function drawImage () {
  var randomize = [];
  var indexOne = Math.floor(Math.random() * imagePaths.length);
  var indexTwo = Math.floor(Math.random() * imagePaths.length);
  while (indexOne === indexTwo){
    indexTwo = Math.floor(Math.random() * imagePaths.length);
    console.log(indexOne);
    console.log(indexTwo);
  }
  var indexThree = Math.floor(Math.random() * imagePaths.length);
  while (indexThree === indexOne || indexThree === indexTwo){
    indexThree = Math.floor(Math.random() * imagePaths.length);
  }
  randomize.push(indexOne);
  randomize.push(indexTwo);
  randomize.push(indexThree);

  for (var t = 0; t < 3; t++){
    var randomPath = imagePaths[randomize[t]];
    var img = document.createElement('img');
    var li = document.createElement('li');
    img.setAttribute('src', 'img/' + randomPath);
    li.appendChild(img);
    imageList.appendChild(li);
    console.log(randomPath);
  }
}

var imageList = document.getElementById('images');

imageList.addEventListener('click', clickHandler);

drawImage();

function clickHandler(e) {
  console.log(e.target);
  imageList.textContent = '';
  drawImage();
}
