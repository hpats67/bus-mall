'use strict';

var imagePaths = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
var images = [];
var randomIndicies = [];

for (var i = 0; i < imagePaths.length; i++){
  var name = imagePaths[i];
  new Image(null, name);
}

function drawImage () {
  function random() {
    var indexOne = Math.floor(Math.random() * imagePaths.length);
    var indexTwo = Math.floor(Math.random() * imagePaths.length);
    while (randomIndicies.indexOf(indexOne) != -1){
      indexOne = Math.floor(Math.random() * imagePaths.length);
    }
    while (indexOne === indexTwo || randomIndicies.indexOf(indexTwo) != -1){
      indexTwo = Math.floor(Math.random() * imagePaths.length);
    }
    var indexThree = Math.floor(Math.random() * imagePaths.length);
    while (indexThree === indexOne || indexThree === indexTwo
      || randomIndicies.indexOf(indexThree) != -1){
      indexThree = Math.floor(Math.random() * imagePaths.length);
    }

    return [indexOne, indexTwo, indexThree];
  }

  randomIndicies = random();


  for (var t = 0; t < 3; t++){
    var randomPath = imagePaths[randomIndicies[t]];
    var img = document.createElement('img');
    var li = document.createElement('li');
    img.setAttribute('src', 'img/' + randomPath);
    li.appendChild(img);
    imageList.appendChild(li);
  }
  console.log(randomIndicies);
}

var imageList = document.getElementById('images');

imageList.addEventListener('click', clickHandler);

drawImage();

function clickHandler(e) {
  console.log(e.target);
  imageList.textContent = '';
  drawImage();
}

function Image(name, path){
  this.views = 0;
  this.clicks = 0;
  this.name = name;
  this.path = path;

  images.push(this);
};
