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

  // sobrepor box container à imagem
  function matchImageSize() {
    if (!overlayIsOpened) return;
    // box container
    const boxContainerEl = document.getElementById('overlay--box-container');
    boxContainerEl.style.width = `${imgEl.width}px`;
    boxContainerEl.style.height = `${imgEl.height}px`;
    // box element
    const boxEl = document.getElementById('overlay--box');
    const objBox = objectData["images"][imageId]["boxes"][activeSubcategory];
    // redimensionar tamanho do retângulo
    boxEl.style.width = `${(objBox[2] - objBox[0]) * imgEl.width}px`;
    boxEl.style.height = `${(objBox[3] - objBox[1]) * imgEl.height}px`;
    boxEl.style.marginLeft = `${objBox[0] * imgEl.width}px`;
    boxEl.style.marginTop = `${objBox[1] * imgEl.height}px`;
  }
  if (imgEl.complete) matchImageSize();
  else imgEl.addEventListener('load', matchImageSize);

  // essa parte tenta corrigir um problema de como a imagem e o retângulo estão estruturados no HTML e CSS
  // os elementos estão separados, então, quando o tamanho da imagem muda, o box container precisa atualizar
  // no futuro a intenção é melhorar a estrutura da imagem e que esse remendo não precise existir
  const resizeBoxEl = new ResizeObserver(matchImageSize);
  resizeBoxEl.observe(imgEl);

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