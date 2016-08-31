'use strict';

var imagePaths = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
var images = [];
var randomIndicies = [];

for (var i = 0; i < imagePaths.length; i++){
  var name = imagePaths[i]; //eslint-disable-line
  new Image(null, name);
}

var imageList = document.getElementById('images');

imageList.addEventListener('click', clickHandler);

drawImage();

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
}

var count = 0;
function clickHandler(e) {
  if (count < 20){
    console.log(e.target);
    var matchPath = e.target.getAttribute('src');
    console.log(matchPath);
    for(var i = 0; i < randomIndicies.length; i++){
      var currentIndex = randomIndicies[i];
      var displayedObject = images[currentIndex];
      displayedObject.views += 1;
    }
    for (var t = 0; t < images.length; t++){
      var currentImageObject = images[t];
      if (currentImageObject.path === matchPath){
        console.log('found it! ', currentImageObject);
        currentImageObject.clicks += 1;
      };
    }
    imageList.textContent = '';
    drawImage();
    console.log(images);

    count++;
    console.log('click counter: ' + count);
  };


}

function Image(name, path){ //eslint-disable-line
  this.views = 0;
  this.clicks = 0;
  this.name = name;
  this.path = 'img/' + path;

  images.push(this);
};
