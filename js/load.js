const OBJS_URL = "https://raw.githubusercontent.com/acervos-digitais/arquigrafia-data/main/json/objects.json";
const IMAGES_URL = "https://www.arquigrafia.org.br/arquigrafia-images/IDID_view.jpg";
const INFO_URL = "https://www.arquigrafia.org.br/photos/IDID";

const objectDataP = fetchData(OBJS_URL);
let objectData = null;

document.addEventListener("DOMContentLoaded", async () => {
  objectData = await objectDataP;
  populateCategories();
  resetImages();
  setupColorPicker();
});

async function fetchData(mUrl) {
  const response = await fetch(mUrl);
  return await response.json();
}