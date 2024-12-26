let currentImages = [];
let currentImageIdx = 0;

function resetImages(displayHelper = false) {
  const imagesContainer = document.getElementById('images--container');
  const imagesContainerString = document.getElementById('images--string');
  if (displayHelper) {
    imagesContainer.innerHTML = imagesContainerString.innerHTML;
    imagesContainer.classList.add('images--helper');
  } else {
    imagesContainer.innerHTML = '';
    imagesContainer.classList.remove('images--helper');
  }
}

function loadImages(subcategory) {
  currentImages = objectData["objects"][subcategory];
  if (currentImages === undefined || currentImages.length === 0) {
    console.log('objeto não definido');
    return;
  }
  populateImageContainer();
}

function populateImageContainer() {
  resetImages();
  for (let i = 0; i < currentImages.length; i++) createImageElement(currentImages[i]);
  updateImagesByColor();
}

function createImageElement(imageId) {
  if (createImageElement === undefined) return;

  let imagesContainer = document.getElementById('images--container');

  const img = document.createElement('img');
  const imgUrl = IMAGES_URL.replace("IDID", imageId);
  img.src = imgUrl;

  const a = document.createElement('a');
  a.classList.add('images--element');
  a.setAttribute("data--image-id", imageId);
  a.addEventListener('click', () => populateOverlay(imageId, imgUrl));
  imagesContainer.appendChild(a);
  a.appendChild(img);
}