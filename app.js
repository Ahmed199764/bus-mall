'use strict';

var names = [
    "bag.jpg",
    "banana.jpg",
    "bathroom.jpg",
    "boots.jpg",
    "breakfast.jpg",
    "bubblegum.jpg",
    "chair.jpg",
    "cthulhu.jpg",
    "dog-duck.jpg",
    "dragon.jpg",
    "pen.jpg",
    "pet-sweep.jpg",
    "scissors.jpg",
    "shark.jpg",
    "sweep.png",
    "tauntaun.jpg",
    "unicorn.jpg",
    "usb.gif",
    "water-can.jpg",
    "wine-glass.jpg",
];

var firstImg = document.getElementById('first');
var secondImg = document.getElementById('second');
var thirdImg = document.getElementById('third');
var imageSection = document.getElementById('imagesSection');
//var results = document.getElementById('results'); 

firstImg.src = `assets/${names[0]}`;
firstImg.alt = names[0];
firstImg.title = names[0];

secondImg.setAttribute('src', `assets/${names[1]}`);
secondImg.setAttribute('alt', names[1]);
secondImg.setAttribute('title', names[1]);

thirdImg.setAttribute('src', `assets/${names[2]}`);
thirdImg.setAttribute('alt', names[2]);
thirdImg.setAttribute('title', names[2]);

var arrayOfImages = [];
function item(name) {
    this.name = name;
    this.clicks = 0;
    this.views = 0;
    this.imagePath = `assets/${this.name}`;
    item.all.push(this);
}
item.all = [];

for (var i = 0; i < names.length; i++) {
    new item(names[i]);
}

var firstItem, secondItem, thirdItem;
function render() {
    firstItem = item.all[randomNumber(0, item.all.length - 1)];
    console.log(firstItem);
    secondItem = item.all[randomNumber(0, item.all.length - 1)];
    console.log(secondItem);
    thirdItem = item.all[randomNumber(0, item.all.length - 1)];
    console.log(thirdItem);
    while (firstItem === secondItem || firstItem === thirdItem || secondItem === thirdItem) {
        render();
    }
    firstImg.setAttribute('src', firstItem.imagePath);
    firstImg.setAttribute('alt', firstItem.name);
    firstImg.setAttribute('title', firstItem.name);
    secondImg.setAttribute('src', secondItem.imagePath);
    secondImg.setAttribute('alt', secondItem.name);
    secondImg.setAttribute('title', secondItem.name);
    thirdImg.setAttribute('src', thirdItem.imagePath);
    thirdImg.setAttribute('alt', thirdItem.name);
    thirdImg.setAttribute('title', thirdItem.name);
}
render();


imageSection.addEventListener('click', handleClickOnItem);
var totalClicks = 0;
var totalViews = 0;
function handleClickOnItem(event) {
    if (totalClicks < 25) {

        if (event.target.id !== 'imagesSection') {

            if (event.target.id === 'first') {
                firstItem.clicks++;
                firstItem.views++;
                if (event.target.id === 'second') {
                    secondItem.clicks++;
                    secondItem.views++;
                } else if (event.target.id === 'third') {
                    thirdItem.clicks++;
                    thirdItem.views++;
                }

            }
            render();
            totalClicks++;
            totalViews++;
            firstChart()
        }
    } else {
        console.log('more than 25 clicks');
        imageSection.removeEventListener('click', handleClickOnItem);
        render2();
    }
}
function render2() {
    var ulE1 = document.getElementById('summary');
    for (var i = 0; i < item.all.length; i++) {
        var liE1 = document.createElement('li');
        liE1.textContent = `${item.all[i].name} has ${item.all[i].clicks} clicks and ${item.all[i].views} views`;
        ulE1.appendChild(liE1);
    }
    var h3 = document.getElementById('h3')
    h3.textContent = "Total Clicks :" + totalClicks;
    var h3a = document.getElementById('h3a')
    h3a.textContent = "Total views :" + totalViews;
    //var totalViews=
    console.log(totalClicks);

    console.log('testing smth ' + item.clicks);

    // var arrayClicks =[];
    // var arrayNames = [];
    // for (var i = 0; i < item.all.length; i++) {
    //     if(item.all[i] == name)
    //     {
    //         arrayNames.push(item.all[i]);
    //     }
    //     else{
    //         arrayClicks.push(item.all[i]);
    //     }  
    // }
    // console.log('clicks : ' +arrayClicks);
    // console.log('names : '+arrayNames);
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// for(var i=0 ;names.length;i++){
//     var nowClicks =item.clicks;
//     var nowNames=item.name;
// }
// console.log("clicks "+nowNames);

function firstChart() {
    var ctx = document.getElementById('chartResult').getContext('2d');
    var chartResult = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["bag.jpg",
                "banana.jpg",
                "bathroom.jpg",
                "boots.jpg",
                "breakfast.jpg",
                "bubblegum.jpg",
                "chair.jpg",
                "cthulhu.jpg",
                "dog-duck.jpg",
                "dragon.jpg",
                "pen.jpg",
                "pet-sweep.jpg",
                "scissors.jpg",
                "shark.jpg",
                "sweep.png",
                "tauntaun.jpg",
                "unicorn.jpg",
                "usb.gif",
                "water-can.jpg",
                "wine-glass.jpg"],
            datasets: [{
                label: '# of clicks' + totalClicks,
                data: [item.clicks], 
                //  label: 'total of views'+ `${totalview}`,
                //data: views,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

