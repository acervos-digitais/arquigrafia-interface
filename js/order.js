let updateImagesBy = {};

function setupOrderCategories() {
  const orderCategoriesEl = document.getElementById("order--categories");
  orderCategoriesEl.addEventListener("change", updateOrderSubcategories);

  updateImagesBy["color"] = updateImagesByColor;
  updateImagesBy["cluster"] = updateImagesByCluster;

  // Temporário
  if (!window.location.hash.includes("cluster")) {
    document.getElementById("order--cluster").style.display = "none";
  }
}

function updateOrderSubcategories(ev) {
  const subcategoryEls = document.getElementsByClassName("order--subcategory");
  const category = ev.target.value;

  for (sub of subcategoryEls) {
    if (!sub.id.includes(category)) {
      sub.classList.add("order--subcategory--hidden");
    } else {
      sub.classList.remove("order--subcategory--hidden");
    }
  }
  updateImagesBy[category]();
}
