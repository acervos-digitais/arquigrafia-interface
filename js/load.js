const OBJS_URL = "https://raw.githubusercontent.com/acervos-digitais/arquigrafia-data/main/json/objects.json";
const IMAGES_URL = "https://www.arquigrafia.org.br/arquigrafia-images/IDID_view.jpg";
const INFO_URL = "https://www.arquigrafia.org.br/photos/IDID";
const AUDIO_URL = "https://acervos-digitais.github.io/arquigrafia-media/mp3s/captions/LANGLANG/IDID.mp3";

const objectDataP = fetchData(OBJS_URL);
let objectData = null;

document.addEventListener("DOMContentLoaded", async () => {
  objectData = await objectDataP;
  populateCategories();
  resetImages(true);
  setupOrderCategories();
  setupColorPicker();
  setupClusterPicker();
  setupScrollbar();
});

async function fetchData(mUrl) {
  const response = await fetch(mUrl);
  return await response.json();
}

function openMobileMenu() {
  const menuButton = document.getElementById('nav--menu-button');
  const menuContent = document.getElementById('nav--main');
  menuButton.classList.toggle('open');
  menuContent.classList.toggle('open');
}