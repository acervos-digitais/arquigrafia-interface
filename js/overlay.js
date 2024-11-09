let overlayIsOpened = false;

function populateOverlay(imageId, imgUrl) {
  // imagem
  const imgEl = document.getElementById("overlay--image");
  imgEl.src = imgUrl;

  // cores
  const imgColors = objectData.images[imageId]["dominant_color"]["palette"];
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
  captionEl.innerHTML = objectData.images[imageId]["captions"][pageLanguage]["gpt"];

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


function loadImageDetailOverlay(imageId) {
  console.log(objectData.images[imageId]);
  // return (ev) => {
  //   const selInputEl = document.getElementById("selection-container");
  //   const detailOverlayEl = document.getElementById("detail-overlay");
  //   const detailContentEl = document.getElementById("detail-content");
  //   const imgEl = document.getElementById("detail-image");
  //   const canvasEl = document.getElementById("detail-canvas");
  //   const captionEl = document.getElementById("detail-caption");
  //   const detailColorsEl = document.getElementById("dominant-color-wrapper");
  //   const linkEl = document.getElementById("detail-link");

  //   const audioEl = document.getElementById("caption-audio");
  //   const audioPlayEl = document.getElementById("caption-play-button");

  //   const canvasCtx = canvasEl.getContext("2d");

  //   const imageId = ev.currentTarget.getAttribute("data-image-id");
  //   const evImgEl = ev.currentTarget.querySelector("img");
  //   const imgColors = objectData["images"][imageId]["dominant_color"]["palette"];
  //   const imgBinaries = objectData["images"][imageId]["binaries"] || {};

  //   const imgSrc = evImgEl.src;
  //   const linkHref = INFO_URL.replace("IDID", imageId);

  //   detailContentEl.style.opacity = 0;

  //   linkEl.innerHTML = INFO_STRING[lang()];
  //   imgEl.setAttribute("src", imgSrc);
  //   imgEl.removeAttribute("width");
  //   imgEl.removeAttribute("height");
  //   linkEl.setAttribute("href", linkHref);

  //   detailColorsEl.innerHTML = "";
  //   imgColors.forEach((c) => {
  //     const cEl = document.createElement("div");
  //     cEl.classList.add("dominant-color");
  //     cEl.style.backgroundColor = `rgb(${c.join(",")})`;
  //     detailColorsEl.appendChild(cEl);
  //   });

  //   const binText = [];
  //   for (const [key, value] of Object.entries(imgBinaries)) {
  //     binText.push(`${BINARY_STRING[lang()][key]}: ${value}`);
  //   }

  //   captionEl.innerHTML = objectData["images"][imageId]["captions"][lang()]["gpt"];

  //   audioPlayEl.style.display = "none";
  //   audioEl.src = AUDIO_URL.replace("IDID", imageId).replace("LANGLANG", lang());

  //   canvasCtx.clearRect(0, 0, canvasEl.width, canvasEl.height);

  //   function drawBox() {
  //     const selObj = selInputEl.getAttribute("data-selected-object");
  //     const objBox = objectData["images"][imageId]["boxes"][selObj];

  //     const overlayW = detailOverlayEl.offsetWidth;
  //     const overlayH = detailOverlayEl.offsetHeight;
  //     const imgW = imgEl.width;
  //     const imgH = imgEl.height;

  //     const imgMargin = 0.75;
  //     const factorW = (imgMargin * overlayW) / imgW;
  //     const factorH = (imgMargin * overlayH) / imgH;

  //     if (imgW > imgMargin * overlayW || imgH > imgMargin * overlayH) {
  //       const scaleFactor = Math.min(factorW, factorH);
  //       imgEl.width = scaleFactor * imgW;
  //       imgEl.height = scaleFactor * imgH;
  //     }

  //     canvasEl.width = imgEl.width;
  //     canvasEl.height = imgEl.height;

  //     const boxX = objBox[0] * imgEl.width;
  //     const boxY = objBox[1] * imgEl.height;
  //     const boxW = (objBox[2] - objBox[0]) * imgEl.width;
  //     const boxH = (objBox[3] - objBox[1]) * imgEl.height;

  //     canvasCtx.strokeStyle = "#0f0";
  //     canvasCtx.lineWidth = 4;
  //     canvasCtx.strokeRect(boxX, boxY, boxW, boxH);

  //     detailContentEl.style.opacity = 1;
  //   }

  //   detailOverlayEl.classList.add("visible");
  //   document.body.addEventListener("wheel", prevDef, { passive: false });

  //   // TODO: fix this
  //   setTimeout(drawBox, 200);
  // };
}