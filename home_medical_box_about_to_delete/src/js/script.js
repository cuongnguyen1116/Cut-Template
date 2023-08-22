const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const pagination = document.querySelector(".pagination");

let currentIndex = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - index)}%)`;
  });
}

function setActivePagination(index) {
  const paginationDots = document.querySelectorAll(".pagination span");
  paginationDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
  setActivePagination(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
  setActivePagination(currentIndex);
}

pagination.innerHTML = `<span class="dot"></span>`.repeat(slides.length);
const paginationDots = document.querySelectorAll(".pagination span");
paginationDots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    currentIndex = i;
    showSlide(currentIndex);
    setActivePagination(currentIndex);
  });
});

showSlide(currentIndex); // Hiển thị slide ban đầu
setInterval(nextSlide, 2500);
