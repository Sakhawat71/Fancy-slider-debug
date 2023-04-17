/**
Problems:
i. API fix
ii. show slider
iii. slider time (Negative positive)
iv. add: search option with enter key
v. select unselect images with toggle

for Bonus : 
i. spinner 
ii. navber
*/


const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');

let sliders = [];

const KEY = `35343248-4f7358d208b6ef1d8700f1637`;


//  add spinner
const showSpinner = ()=>{
    let spinnerdiv = document.getElementById("spinner-div");
    spinnerdiv.classList.toggle("d-none");
}


const showImages = (images) => {
  imagesArea.style.display = 'block';
  gallery.innerHTML = '';

  galleryHeader.style.display = 'flex';

  images.forEach(image => {
    let div = document.createElement('div');
    div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    div.innerHTML = ` <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
    gallery.appendChild(div)
  })
  showSpinner();
}

const getImages = (query) => {
    showSpinner()
    fetch(`https://pixabay.com/api/?key=${KEY}&q=${query}&image_type=photo&pretty=true`)
    .then(res => res.json())
    .then(data => showImages(data.hits)) // fix problem 1: { hitS } 
    .catch(err => console.log(err))
}

// search Enter option
document.getElementById("search").addEventListener("keypress", function(event) {
    if (event.key === 'Enter')
    document.getElementById("search-btn").click();
});

let slideIndex = 0;

const selectItem = (event, img) => {
    let element = event.target;
    element.classList.toggle('added');
    let item = sliders.indexOf(img);
    if (item === -1) {
        sliders.push(img);
    }else{
      sliders.splice(item, 1);
    }
}
var timer

const createSlider = () => {

  if (sliders.length < 2) {
    alert('Select at least 2 image.')
    return;
  }

  sliderContainer.innerHTML = '';
  const prevNext = document.createElement('div');
  prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;

  sliderContainer.appendChild(prevNext)
  document.querySelector('.main').style.display = 'block';
 
  imagesArea.style.display = 'none';

  sliders.forEach(slide => {
    let item = document.createElement('div')
    item.className = "slider-item";
    item.innerHTML = `<img class="w-100"
    src="${slide}"
    alt="">`;
    sliderContainer.appendChild(item)
  })

const durationRow = document.getElementById('duration').value || 1000;
const durationNum = parseInt(durationRow);
const duration = Math.abs(durationNum);

  changeSlide(0)
  timer = setInterval(function () {
    slideIndex++;
    changeSlide(slideIndex);
  }, duration);
}

const changeItem = index => {
  changeSlide(slideIndex += index);
}

const changeSlide = (index) => {

  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach(item => {
    item.style.display = "none"
  })

  items[index].style.display = "block"
}

searchBtn.addEventListener('click', function () {
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);
  const search = document.getElementById('search');
  getImages(search.value)
  sliders.length = 0;
})

sliderBtn.addEventListener('click', function () {
  createSlider()
})
