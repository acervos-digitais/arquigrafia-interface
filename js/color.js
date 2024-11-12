
function setupColorPicker() {
  const colorPickerEl = document.getElementById("color--selection");
  colorPickerEl.addEventListener("change", updateImagesByColor);
}

function updateImagesByColor() {
  if (activeSubcategory === '') return;

  const colorPickerEl = document.getElementById("color--selection");
  const rgbSelected = hexToRgb(colorPickerEl.value);

  // pegar informação de id e cores, com base nos divs existentes
  const imgContainerEl = document.getElementById("images--container");
  const imgEls = Array.from(imgContainerEl.getElementsByClassName("images--element"));
  const imgElsId = imgEls.map(el => el.getAttribute('data--image-id'));
  const imgObjects = imgElsId.map(v => ({
    colors: objectData["images"][v]["dominant_color"]["palette"],
    id: v,
  }));

  const byRgbDist = (a, b) => {
    const aMin = Math.min(...a.colors.map(c => rgbDist(c, rgbSelected)));
    const bMin = Math.min(...b.colors.map(c => rgbDist(c, rgbSelected)));
    return aMin - bMin;
  };

  const sortedIds = imgObjects.toSorted(byRgbDist).map(o => o.id);

  // mapear ids aos elementos div
  const idToElMap = new Map();
  imgEls.forEach((el, i) => idToElMap.set(imgElsId[i], el));

  // refixar elementos em ordem
  sortedIds.forEach(id => {
    const el = idToElMap.get(id);
    imgContainerEl.appendChild(el);
  });
}


// Conversão do formato hex (0x0123AB) para lista RGB ([12, 123, 222])
function hexToRgb(hex) {
  return [
    ("0x" + hex[1] + hex[2]) | 0,
    ("0x" + hex[3] + hex[4]) | 0,
    ("0x" + hex[5] + hex[6]) | 0,
  ];
}


// Distancia entre duas cores, usando um fator para afastar cores cinzas/pretas/brancas
function rgbDist(c0, c1) {
  const c0Range = Math.max(...c0) - Math.min(...c0);
  const c1Range = Math.max(...c1) - Math.min(...c1);
  greyFactor = c0Range < c1Range && c0Range < 20 ? 255 - c0Range / 1 : 0;
  return c0.reduce((s, _, i) => s + Math.abs(c0[i] - c1[i]), greyFactor);
}

function rgbDistId(c0, c1) {
  const c0Range = Math.max(...c0) - Math.min(...c0);
  const c1Range = Math.max(...c1) - Math.min(...c1);
  greyFactor = c0Range < c1Range && c0Range < 20 ? 255 - c0Range / 1 : 0;
  return c0.reduce((s, _, i) => s + Math.abs(c0[i] - c1[i]), greyFactor);
}