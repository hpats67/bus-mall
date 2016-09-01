'use strict';

//vars to be used during the script
var imagePaths = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
var images = []; //storing image objects
var randomIndicies = []; //used for no repeats
var namesArray = []; //used for naming chart bars
var clicksArray = []; //used for counting clicks in chart
var viewsArray = []; //used for counting views
var backgroundColor = []; //used for capturing a generated bg color for bars in chart
var jsonString = []; //used for sending data to local storage

//checking to see if there is anything in the local storage and
//retrieving info if there is
if (localStorage.length > 0){
  images = localStorage.getItem('images');
  images = JSON.parse(images);
} else{
  //if not then start from the beginnning
  for (var i = 0; i < imagePaths.length; i++){
    var name = imagePaths[i];//eslint-disable-line
    var path = imagePaths[i];
    new Image(name, path);
  };
  function Image(name, path){ //eslint-disable-line
    this.views = 0;
    this.clicks = 0;
    this.name = name.substring(0,path.length - 4);
    this.path = 'img/' + path;

    images.push(this);
  }
}

var imageList = document.getElementById('images');
//creating a clickable event
imageList.addEventListener('click', clickHandler);

drawImage();
//draw image function that repeats 3 times so drawImage can be called once
function drawImage () {
  //function for keeping images and image sets different
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
//draws the images to the DOM
  for (var t = 0; t < 3; t++){
    var randomPath = imagePaths[randomIndicies[t]];
    var img = document.createElement('img');
    var li = document.createElement('li');
    img.setAttribute('src', 'img/' + randomPath);
    li.appendChild(img);
    imageList.appendChild(li);
  }
}
//creation of counter for tracking how many clicks
var count = 0;
//describing the click event
function clickHandler(e) {
  //if statement to allow only 20 clicks
  if (count < 20){
    chartArrays();
    var matchPath = e.target.getAttribute('src');
    //tracking the views
    for(var i = 0; i < randomIndicies.length; i++){
      var currentIndex = randomIndicies[i];
      var displayedObject = images[currentIndex];
      displayedObject.views += 1;
    }
    //tracking the clicks
    for (var t = 0; t < images.length; t++){
      var currentImageObject = images[t];
      if (currentImageObject.path === matchPath){
        console.log('found it! ', currentImageObject);
        currentImageObject.clicks += 1;
      };
    }

    imageList.textContent = '';
    drawImage();

    count++;

  }
  //allows for the creation of the chart after 20 clicks have been made
  else {
    var ctx = document.getElementById('chart_canvas');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: namesArray,
        datasets: [{
          label: 'Votes',
          data: clicksArray,
          backgroundColor: backgroundColor[0],
        },
        //creation of a second bar inside chart
        {
          label: 'Views',
          data: viewsArray,
          backgroundColor: backgroundColor[1],
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
    //after the last click, this stores objects in local storage
    jsonString = JSON.stringify(images);
    localStorage.setItem('images', jsonString);
  };
}

//placing amounts in arrays for use in chart
function chartArrays (){
  clicksArray = [];
  namesArray = [];
  viewsArray = [];
  for (var ia = 0; ia < images.length; ia++){
    namesArray.push(images[ia].name);
    viewsArray.push(images[ia].views);
    clicksArray.push(images[ia].clicks);
  }
}
//creating a randomly generated color for bars in chart simple version found
//at https://randomcolor.llllll.li/
for (var bc = 0; bc < 2; bc++){
  backgroundColor.push('#' + Math.floor(Math.random() * 16777215).toString(16));
}
