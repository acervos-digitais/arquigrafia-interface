function setupClusterPicker() {
  const i0 = Object.keys(objectData["images"])[0];
  const numClusters = objectData["images"][i0]["embeddings"]["cluster_distances"].length;

  const clusterPickerEl = document.getElementById("cluster--selection");
  clusterPickerEl.addEventListener("change", updateImagesByCluster);

  for (let i = 0; i < numClusters; i++) {
    const opt = document.createElement("option");
    opt.setAttribute("value", i);
    opt.innerHTML = i;
    clusterPickerEl.appendChild(opt);
  }
}

function updateImagesByCluster() {
  if (activeSubcategory === '') return;

  const clusterPickerEl = document.getElementById("cluster--selection");
  const clusterSelected = clusterPickerEl.value;

  // pegar informação de id e cluster_distance, com base nos divs existentes
  const imgContainerEl = document.getElementById("images--container");
  const imgEls = Array.from(imgContainerEl.getElementsByClassName("images--element"));
  const imgElsId = imgEls.map(el => el.getAttribute('data--image-id'));
  const imgObjects = imgElsId.map(v => ({
    dist: objectData["images"][v]["embeddings"]["cluster_distances"][clusterSelected],
    id: v,
  }));

  const byClusterDist = (a, b) => {
    return a.dist - b.dist;
  };

  const sortedIds = imgObjects.toSorted(byClusterDist).map(o => o.id);

  // mapear ids aos elementos div
  const idToElMap = new Map();
  imgEls.forEach((el, i) => idToElMap.set(imgElsId[i], el));

  // refixar elementos em ordem
  sortedIds.forEach(id => {
    const el = idToElMap.get(id);
    imgContainerEl.appendChild(el);
  });
}
