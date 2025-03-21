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

if (navigator.userAgent.toLowerCase().includes("firefox")) {
  const style = document.createElement("style");
  style.innerHTML = `
    * {
      scrollbar-width: thin;
      scrollbar-color: var(--color--gray-1) white;
    }
    
    .images--container {
      scrollbar-color: var(--scrollbar-images) transparent;
    }
  `;
  document.head.appendChild(style);
}