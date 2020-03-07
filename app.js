'use strict';

var imagesStorge = [];
var pressImage = document.getElementById('Store');
var results = document.getElementById('update');
var noClicks = [];
var itemOfLabels = [];
var itemVote = [];
var itemClick = [];
var imgName = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair',
    'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass',
];
var imgPath = ['assets/bag.jpg', 'assets/banana.jpg', 'assets/bathroom.jpg', 'assets/boots.jpg', 'assets/breakfast.jpg', 'assets/bubblegum.jpg', 'assets/chair.jpg',
    'assets/cthulhu.jpg', 'assets/dog-duck.jpg', 'assets/dragon.jpg', 'assets/pen.jpg', 'assets/pet-sweep.jpg', 'assets/scissors.jpg', 'assets/shark.jpg', 'assets/sweep.png', 'assets/tauntaun.jpg', 'assets/unicorn.jpg', 'assets/usb.gif', 'assets/water-can.jpg', 'assets/wine-glass.jpg',
];

var Item = function(imgName, imgPath) {
    this.imgName = imgName;
    this.imgPath = imgPath;
    this.votes = 0;
    this.displayed = 0;
    imagesStorge.push(this);
};


// function updateItems() {
//     var itemString = JSON.stringify(imagesStorge);
//     localStorage.setItem('mallItems', itemString);
// }

// function getItems() {
//     var itemString = localStorage.getItem('mallItems');
//     if (itemString) {
//         imagesStorge = JSON.parse(itemString);
//         console.log("imagesStorge : "+imagesStorge);
//         showImg();
//         myChart();
//     }
// }


function createNewImage() {
    for (var i = 0; i < imgPath.length; i++) {
        new Item(imgName[i], imgPath[i]);
    }
};
createNewImage();


function randomImage() {
    return Math.floor(Math.random() * imagesStorge.length);
}

function showImg() {
    var leftImgPlace = randomImage();
    var centerImgPlace = randomImage();
    var rightImgPlace = randomImage();

    while (centerImgPlace === leftImgPlace) {
        centerImgPlace = randomImage();
    }

    while (rightImgPlace === centerImgPlace || rightImgPlace === leftImgPlace) {
        rightImgPlace = randomImage();
    }
    var leftImg = document.getElementById('left');
    leftImg.src = imagesStorge[leftImgPlace].imgPath;
    leftImg.alt = imagesStorge[leftImgPlace].imgName;

    var centerImg = document.getElementById('center');
    centerImg.src = imagesStorge[centerImgPlace].imgPath;
    centerImg.alt = imagesStorge[centerImgPlace].imgName;

    var rightImg = document.getElementById('right');
    rightImg.src = imagesStorge[rightImgPlace].imgPath;
    rightImg.alt = imagesStorge[rightImgPlace].imgName;
}

showImg();
alert('Click on images you like to vote :)');
pressImage.addEventListener("click", showImgClick);

function showImgClick(event) {
    event.preventDefault();
    var imgId = event.target.id;
    var imgAlt = event.target.alt;

    if (imgId === 'Store') {} else if (noClicks < 25) {
        for (var i = 0; i < imagesStorge.length; i++) {
            if (imgAlt === imagesStorge[i].imgName) {
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
        itemClick.push(imagesStorge[i].votes);
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
                    backgroundColor: '#00BFD0',
                    borderWidth: 1
                },
                {
                    label: 'Number Of Clicks',
                    data: itemClick,
                    backgroundColor: '#ff6384',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Mall Items'
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
}
pressImage.addEventListener('click', showImgClick);
results.addEventListener('click', itemsChart);
