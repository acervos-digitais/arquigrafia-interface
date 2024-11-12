let cImages = [];
let cImageIdx = 0;

function resetImages() {
  const imagesContainer = document.getElementById('images--container');
  imagesContainer.innerHTML = '';
}

function loadImages(subcategory) {
  cImages = objectData["objects"][subcategory];
  if (cImages === undefined || cImages.length === 0) {
    console.log('objeto não definido');
    return;
  }
  populateImageContainer();
}

function populateImageContainer() {
  resetImages();
  for (let i = 0; i < cImages.length; i++) createImageElement(cImages[i]);
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