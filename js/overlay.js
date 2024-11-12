let overlayIsOpened = false;

function populateOverlay(imageId, imgUrl) {
  // imagem
  const imgEl = document.getElementById("overlay--image");
  imgEl.src = imgUrl;

  // cores
  const imgColors = objectData["images"][imageId]["dominant_color"]["palette"];
  const imgColorsEl = document.getElementById('overlay--colors');
  imgColorsEl.innerHTML = "";
  imgColors.forEach(c => {
    const colorDiv = document.createElement("div");
    colorDiv.classList.add("overlay--colors-display");
    colorDiv.style.backgroundColor = `rgb(${c.join(",")})`;
    imgColorsEl.appendChild(colorDiv);
  });

  // descrição
  const captionEl = document.getElementById('overlay--caption');
  captionEl.innerHTML = objectData["images"][imageId]["captions"][pageLanguage]["gpt"];

  // mais informações
  const linkEl = document.getElementById('overlay--info');
  const linkHref = INFO_URL.replace("IDID", imageId);
  linkEl.setAttribute("href", linkHref);

  // mostrar overlay
  const overlay = document.getElementById('overlay');
  overlay.classList.remove('overlay--hidden');
  setTimeout(() => overlayIsOpened = true, 1);
}

// fechar overlay
document.addEventListener('click', ev => {
  if (!overlayIsOpened) return;
  const overlayWindow = document.getElementById('overlay--window');
  if (!overlayWindow.contains(ev.target)) {
    const overlay = document.getElementById('overlay');
    overlay.classList.add('overlay--hidden');
    overlayIsOpened = false;
  }
});