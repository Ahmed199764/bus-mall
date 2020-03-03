'use strict';

var imagesStorge = [];

var pressImage = document.getElementById('Store');

//var results = document.getElementById('update');

//var refresh = document.getElementById('refreshPage');

var noClicks = [];//15 is the total number of clicks to view the vote result.

var itemOfLabels = [];//this is for the chart.

var itemVote = [];

var imgName = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair',
'cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass',];
var imgPath = ['img/bag.jpg','img/banana.jpg','img/bathroom.jpg','img/boots.jpg','img/breakfast.jpg','img/bubblegum.jpg','img/chair.jpg',
'img/cthulhu.jpg','img/dog-duck.jpg','img/dragon.jpg','img/pen.jpg','img/pet-sweep.jpg','img/scissors.jpg','img/shark.jpg','img/sweep.jng','img/tauntaun.jpg','img/unicorn.jpg','img/usb.jpg','img/water-can.jpg','img/wine-glass.jpg',];

var Item = function(imgName, imgPath) { // Constructor : Needs to be capital letter
  //All objects in JavaScript are descended from Object;
  //all objects inherit methods and properties from 'Object.prototype'.
  this.imgName = imgName;
  this.imgPath = imgPath;
  this.votes = 0;
  this.displayed = 0;
  imagesStorge.push(this);
};

function createNewImage() {
  for (var i = 0; i < imgPath.length; i++){
    new Item(imgName[i], imgPath[i]);
  }
};
createNewImage();

function randomImage() {
  return Math.floor(Math.random() * imagesStorge.length);
}

function showImg() {
  var leftImg = randomImage();
  var centerImg = randomImage();
  var rightImg = randomImage();

  while (centerImg === leftImg) {
    centerImg = randomImage();
  }

  while (rightImg === centerImg || rightImg === leftImg) {
    rightImg = randomImage();
  }

  var leftImg = document.getElementById('left');
  leftImg.src = imagesStorge[leftImg].imgPath;
  leftImg.alt = imagesStorge[leftImg].imgName;

  var centerImg = document.getElementById('center');
  centerImg.src = imagesStorge[centerImg].imgPath;
  centerImg.alt = imagesStorge[centerImg].imgName;

  var rightImg = document.getElementById('right');
  rightImg.src = imagesStorge[rightImg].imgPath;
  rightImg.alt = imagesStorge[rightImg].imgName;
}

showImg();

function showImgClick(event) {
  var imgId = event.target.id;
  var imgAlt = event.target.alt;

  if (imgId === 'Store') {
    alert('you want to vote ? Click on the image.');
  } else if (noClicks < 25) {
    for (var i = 0; i < imagesStorge.length; i++) {
      if(imgAlt === imagesStorge[i].imgName) {
        imagesStorge[i].votes += 1;
        noClicks++;
      }
      if (noClicks === 25) {
        document.getElementById('update');
        update.style.visibility = 'visible';
      } else {
        document.getElementById('update');
        update.style.visibility = 'hidden';
        showImg();
      }
    }
  }
}



function updateChart() {
  for (var i = 0; i < imagesStorge.length; i++) {
    itemOfLabels.push(imagesStorge[i].imgName);
    itemVote.push(imagesStorge[i].votes);
  }
}

function itemsChart() {
  updateChart();
  var ctx = document.getElementById('myChart');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: itemOfLabels,
      datasets: [{
        label: 'Number Of Votes',
        data: itemVote,
        backgroundColor:'#00BFD0',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Item Types'
          }
        }],
        yAxes: [{
          ticks: {
            max: 4,
            min: 0,
            stepSize: 1,
          }
        }]
      }
    }
  });
//   var refresh = document.createElement('button');
//   refresh.setAttribute('id', 'refreshPage');
//   refresh.textContent = 'Refresh Page';
//   document.getElementById('buttons').appendChild(refresh);
//   refresh.addEventListener('click', refreshPage);
}

// function refreshPage() {
//   window.location.reload();
// }

pressImage.addEventListener('click', showImgClick);
results.addEventListener('click', itemsChart);
//refresh.addEventListener('click', refreshPage);
