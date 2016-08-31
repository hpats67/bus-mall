'use strict';

var imagePaths = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
var images = [];
var randomIndicies = [];
var namesArray = [];
var clicksArray = [];
var backgroundColor = [];

for (var i = 0; i < imagePaths.length; i++){
  var name = imagePaths[i];//eslint-disable-line
  var path = imagePaths[i];
  new Image(name, path);
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
console.log(namesArray);
var count = 0;
function clickHandler(e) {
  if (count < 20){
    chartArrays();
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
    console.log(clicksArray);

  }
  else {
    var ctx = document.getElementById('chart_canvas');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: namesArray,
        datasets: [{
          label: 'Clicks',
          data: clicksArray,
          backgroundColor: backgroundColor,
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        }
      }
    });
  };
}

function Image(name, path){ //eslint-disable-line
  this.views = 0;
  this.clicks = 0;
  this.name = name.substring(0,path.length - 4);
  this.path = 'img/' + path;

  images.push(this);
};

function chartArrays (){
  clicksArray = [];
  namesArray = [];
  backgroundColor = [];
  for (var ia = 0; ia < images.length; ia++){
    namesArray.push(images[ia].name);
    clicksArray.push(images[ia].clicks);
    backgroundColor.push('#' + Math.floor(Math.random() * 16777215).toString(16));
  }
}

for (var bc = 0; bc < namesArray.length; bc++){
  backgroundColor.push('#' + Math.floor(Math.random() * 16777215).toString(16));
}
