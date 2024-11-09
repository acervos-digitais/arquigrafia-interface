const LABEL_CATEGORY = [
  { label: 'architecture', en: 'architecture', pt: 'arquitetura' },
  { label: 'art', en: 'art and design', pt: 'arte e design' },
  { label: 'materials', en: 'materials', pt: 'materiais' },
  { label: 'nature', en: 'nature', pt: 'natureza' },
];

const LABEL_SUBCATEGORY = {
  architecture: [
    { label: 'railing', en: 'railing/banister', pt: 'corrimão/balaustre' },
    { label: 'stairs', en: 'stairs', pt: 'escada' },
    { label: 'tower', en: 'chimney/tower', pt: 'torre/chaminé' },
    { label: 'window', en: 'window', pt: 'janela' },
  ],
  art: [
    { label: 'chair', en: 'chair', pt: 'cadeira' },
    { label: 'painting', en: 'painting', pt: 'quadro' },
    { label: 'sculpture', en: 'sculpture', pt: 'escultura' },
    { label: 'table', en: 'table', pt: 'mesa' },
    { label: 'vehicle', en: 'vehicle', pt: 'veículo' },
  ],
  materials: [
    { label: 'masonry', en: 'masonry', pt: 'alvenaria' },
    { label: 'wrought', en: 'metal', pt: 'metal' },
  ],
  nature: [
    { label: 'animal', en: 'animals', pt: 'animais' },
    { label: 'cloud', en: 'cloud', pt: 'nuvem' },
    { label: 'greenery', en: 'vegetation', pt: 'vegetação' },
    { label: 'person', en: 'people', pt: 'pessoas' },
    { label: 'sky', en: 'sky', pt: 'céu' },
    { label: 'water', en: 'water', pt: 'água' },
  ],
}

let categoryButtons;
function populateCategories() {
  categoryButtons = [];
  let categoryContainer = document.getElementById('labels--categories');

  LABEL_CATEGORY.forEach(e => {
    let labelButton = document.createElement('button');
    labelButton.textContent = e[pageLanguage];
    labelButton.setAttribute("data-option", e['label']);
    labelButton.addEventListener('click', () => {
      populateSubcategories(e.label);
      resetImages();
      categoryButtons.forEach(b => b.classList.remove('button--active'));
      labelButton.classList.add('button--active');
    });
    
    categoryContainer.appendChild(labelButton);
    categoryButtons.push(labelButton);
  });
}

let subcategoryButtons;
function populateSubcategories(id) {
  subcategoryButtons = [];
  let subcategoryContainer = document.getElementById('labels--subcategories');
  subcategoryContainer.innerHTML = '';

  LABEL_SUBCATEGORY[id].forEach(e => {
    let labelButton = document.createElement('button');
    labelButton.textContent = e[pageLanguage];
    labelButton.setAttribute("data-option", e['label']);
    labelButton.addEventListener('click', () => {
      loadImages(e.label);
      subcategoryButtons.forEach(b => b.classList.remove('button--active'));
      labelButton.classList.add('button--active');
    });

    subcategoryContainer.appendChild(labelButton);
    subcategoryButtons.push(labelButton);
  });
}



// const BINARY_STRING = {
//   en: {
//     "complex/simple": "comp/simp",
//     "horizontal/vertical": "hor/vert",
//     "internal/external": "int/ext",
//     "open/closed": "open/close",
//     "symmetric/asymmetric": "sym/asym",
//     "translucent/opaque": "trans/op",
//   },
//   pt: {
//     "complex/simple": "comp/simp",
//     "horizontal/vertical": "hor/vert",
//     "internal/external": "int/ext",
//     "open/closed": "abe/fec",
//     "symmetric/asymmetric": "sim/assim",
//     "translucent/opaque": "trans/op",
//   },
// }