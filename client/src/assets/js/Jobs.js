const minRange = document.getElementById('min-range');
    const maxRange = document.getElementById('max-range');
    const rangeFill = document.getElementById('slider-range');
    const output = document.getElementById('output');
    const gap = 1; 

    function updateSlider() {
      let minVal = parseInt(minRange.value);
      let maxVal = parseInt(maxRange.value);

      if (maxVal - minVal <= gap) {
        if (event.target === minRange) {
          minRange.value = maxVal - gap;
          minVal = maxVal - gap;
        } else {
          maxRange.value = minVal + gap;
          maxVal = minVal + gap;
        }
      }

      const percent1 = (minVal / minRange.max) * 100;
      const percent2 = (maxVal / maxRange.max) * 100;

      rangeFill.style.left = percent1 + "%";
      rangeFill.style.width = (percent2 - percent1) + "%";

      output.textContent = minVal + " - " + maxVal;
    }

    minRange.addEventListener('input', updateSlider);
    maxRange.addEventListener('input', updateSlider);
    updateSlider();
     const gridBtn = document.getElementById('gridBtn');
    const filterBtn = document.getElementById('filterBtn');


  [gridBtn, filterBtn].forEach(btn => {
    btn.addEventListener("click", () => {
      gridBtn.classList.remove("active");
      filterBtn.classList.remove("active");
      btn.classList.add("active");
    });
  });