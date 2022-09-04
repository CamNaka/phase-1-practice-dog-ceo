
const container = document.querySelector('#dog-image-container')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
const ulContainer = document.querySelector('#dog-breeds')
const dropDown = document.querySelector('#breed-dropdown')
breedsArray = []
//or breedsArray;

ulContainer.addEventListener('click', handleClick) 
dropDown.addEventListener('change', handleChange)

function getImages() {
  fetch(imgUrl)
    .then(resp => resp.json())
    .then(images => {
      const imgs = images.message
      let imgsArray = createImgElement(imgs)
      renderElement(imgsArray)
    })
}

function createImgElement(imgs) {
  return imgs.map((img) => {
    let i = `<img src=${img}>`
    return i
  });
}

function renderImg(imgsArray) {
  imgsArray.forEach(element => {
    renderImg(element)
  })
}

function renderElement(element) {
  ulContainer.innerHTML += element
}


//-----------------------------------------------------------------------------------


function getBreeds() {
  fetch(breedUrl)
    .then(resp => resp.json())
    .then(breeds => {
      breedsArray = Object.keys(breeds.message)
      const breedsLis = createLiElement(breedsArray)
      renderLis(breedsLis)
      /*const imgs = images.message
      let imgsArray = createImgElement(imgs)
      renderImg(imgsArray)*/
    })
}

function createLiElement(breedsArray) {
  return breedsArray.map((breed) => {
    let li = `<li>${breed}</li>`
    console.log(li)
    return li
  });
}

function renderLis(breedsLis) {
  breedsLis.forEach(element => {
    renderElement(element)
  })
}


function handleClick(event){

  if (event.target.nodeName === 'LI'){
    if (event.target.style.color === 'red') {
      event.target.style.color = 'black'
    } 
    else {
      event.target.style.color = 'red'
    }
  }
  
}

function handleChange(event) {
  const letter = event.target.value
  

  //filter out the breeds that start with the letter
  const filterBreeds = breedsArray.filter(breed => breed.startsWith(letter))
  const filterBreedsLis = createLiElement(filterBreeds)
  ulContainer.innerHTML = ''
  renderLis(filterBreedsLis)
}

//getImages()
getBreeds()
