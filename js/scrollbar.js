function updateImageScrollbar(imgContainer) {
  const scrollFactor = imgContainer.scrollTop / (imgContainer.scrollHeight - imgContainer.clientHeight);
  const scrollTrackHeight = imgContainer.clientHeight;
  const thumbHeight = (scrollTrackHeight ** 2) / imgContainer.scrollHeight;
  const scrollDistance = scrollFactor * (scrollTrackHeight - thumbHeight);
  
  const alpha = Math.map(scrollDistance / rem, 0.5, 1, 0, 1, true);
  const rgbaColor = `rgba(180, 180, 180, ${alpha})`;
  document.documentElement.style.setProperty('--scrollbar-images', rgbaColor);
}

function setupScrollbar() {
  const imgContainer = document.getElementById('images--container');
  imgContainer.addEventListener('scroll', () => updateImageScrollbar(imgContainer));
}