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
  const boxContainerEl = document.getElementById('overlay--box-container');
  const boxEl = document.getElementById('overlay--box');
  function matchImageSize() {
    if (!overlayIsOpened) return;
    boxContainerEl.style.width = `${imgEl.width}px`;
    boxContainerEl.style.height = `${imgEl.height}px`;
    const objBox = objectData["images"][imageId]["boxes"][activeSubcategory];
    // redimensionar tamanho do retângulo
    boxEl.style.width = `${(objBox[2] - objBox[0]) * imgEl.width}px`;
    boxEl.style.height = `${(objBox[3] - objBox[1]) * imgEl.height}px`;
    boxEl.style.marginLeft = `${objBox[0] * imgEl.width}px`;
    boxEl.style.marginTop = `${objBox[1] * imgEl.height}px`;
  }
  setTimeout(() => {
    if (imgEl.complete) matchImageSize();
    else imgEl.addEventListener('load', matchImageSize);
  }, window.innerWidth > 600 ? 25 : 100); // às vezes falha sem um tempo de espera

  // essa parte tenta corrigir um problema de como a imagem e o retângulo estão estruturados no HTML e CSS
  // os elementos estão separados, então, quando o tamanho da imagem muda, o box container precisa atualizar
  // no futuro a intenção é melhorar a estrutura da imagem e que esse remendo não precise existir
  const resizeBoxObserver = new ResizeObserver(matchImageSize);
  resizeBoxObserver.observe(imgEl);

  // legenda em áudio
  const audioEl = document.getElementById("overlay--audio");
  const audioMediaEl = document.getElementById("overlay--audio-media");
  audioEl.addEventListener("click", () => audioMediaEl.play());
  audioMediaEl.addEventListener("canplay", () => audioEl.classList.remove("overlay--audio-inactive"));
  audioMediaEl.src = AUDIO_URL.replace("IDID", imageId).replace("LANGLANG", pageLanguage);


  // mostrar overlay
  const overlay = document.getElementById('overlay');
  overlay.classList.remove('overlay--hidden'); audioEl
  setTimeout(() => overlayIsOpened = true, 1); // abrir depois de tentar fechar

  // fechar overlay
  function closeOverlay() {
    if (!overlayIsOpened) return
    const overlayWindow = document.getElementById('overlay--window');
    if (!overlayWindow.contains(event.target)) {
      overlayIsOpened = false;
      overlay.classList.add('overlay--hidden');
      document.removeEventListener('click', closeOverlay);

      boxEl.style.width = '0';
      boxEl.style.height = '0';
      boxEl.style.marginLeft = '-5px';
      boxEl.style.marginTop = '-5px';
      resizeBoxObserver.unobserve(imgEl);
      resizeBoxObserver.disconnect();

      audioMediaEl.src = "";
      audioMediaEl.classList.add("overlay--audio-inactive");
    }
  }
  document.addEventListener('click', closeOverlay);
}