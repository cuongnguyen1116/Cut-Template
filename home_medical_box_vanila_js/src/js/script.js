const slides = document.querySelectorAll(".slide");
const pagination = document.querySelector(".pagination");
pagination.innerHTML = `<span class="dot"></span>`.repeat(slides.length);
const dots = document.querySelectorAll(".dot");

let currentIndex = 0;

function showSlide(index) {
  const offset = index * -100;
  slides.forEach((slide) => {
    slide.style.transform = `translateX(${offset}%)`;
  });
}

function setActiveDot(index) {
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}
setActiveDot(currentIndex);

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    currentIndex = i;
    showSlide(currentIndex);
    setActiveDot(currentIndex);
  });
});

function showNextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
  setActiveDot(currentIndex);
}

setInterval(showNextSlide, 2500);
