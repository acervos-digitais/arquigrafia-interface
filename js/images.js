function resetImages() {
  let imagesContainer = document.getElementById('images--container');
  imagesContainer.innerHTML = '';
}

function loadImages(subcategory) {
  resetImages();
  let imageIds = objectData.objects[subcategory];
  if (imageIds === undefined) {
    console.log('objeto não definido');
    return;
  }
  for (let i = 0; i < imageIds.length; i++) createImageElement(imageIds[i]);
}

function createImageElement(imageId) {
  if (createImageElement === undefined) return;

  let imagesContainer = document.getElementById('images--container');

  const img = document.createElement('img');
  const imgUrl = IMAGES_URL.replace("IDID", imageId);
  img.src = imgUrl;

  const a = document.createElement('a');
  a.classList.add('images--element');
  a.setAttribute("data-image-id", imageId);
  a.addEventListener('click', () => populateOverlay(imageId, imgUrl));
  imagesContainer.appendChild(a);
  a.appendChild(img);
}