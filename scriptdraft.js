window.addEventListener("load", function () {
    const preloader = document.querySelector("[data-preload]");

    // Preloader animation
    preloader.style.transition = "transform 2.5s ease, opacity 2.5s ease";
    preloader.style.transform = "translateY(100%)";
    preloader.style.opacity = "0";

    setTimeout(() => {
        preloader.style.display = "none";
    }, 2500);
});

// Navigation Toggle
document.querySelectorAll("[data-nav-toggler]").forEach((toggle) => {
    toggle.addEventListener("click", function () {
        document.querySelector("[data-navbar]").classList.toggle("active");
        document.body.classList.toggle("nav-active");
    });
});


// Select the header
const header = document.querySelector("[data-header]");
const backToBtn  = document.querySelector("[data-back-top-btn]");
let lastScrollPos = 0;

// Function to handle header visibility on scroll
const handleHeaderScroll = function () {
    const currentScrollPos = window.scrollY;

    if (currentScrollPos > lastScrollPos && currentScrollPos > 50) {
        // Scrolling down: hide the header
        header.classList.add("hide");
    } else {
        // Scrolling up: show the header
        header.classList.remove("hide");
    }

    lastScrollPos = currentScrollPos;
};

// Function to handle the "active" class based on scroll position
const handleHeaderActive = function () {
    if (window.scrollY >= 50) {
        header.classList.add("active");
        backToBtn.classList.add("active");
    } else {
        header.classList.remove("active");
        backToBtn.classList.remove("active");
    }
};

// Attach scroll event listener
window.addEventListener("scroll", function () {
    handleHeaderScroll();
    handleHeaderActive();
});


        
 /** Hero Slider */
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");
let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

/** Update Slider Position */
const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
};

/** Slide Next */
const slideNext = function () {
  currentSlidePos = (currentSlidePos + 1) % heroSliderItems.length;
  updateSliderPos();
};

/** Slide Previous */
const slidePrev = function () {
  currentSlidePos =
    (currentSlidePos - 1 + heroSliderItems.length) % heroSliderItems.length;
  updateSliderPos();
};

/** Attach Event Listeners to Buttons */
heroSliderNextBtn.addEventListener("click", slideNext);
heroSliderPrevBtn.addEventListener("click", slidePrev);

/** Auto Slide */
let autoSlideInterval;

const startAutoSlide = function () {
  autoSlideInterval = setInterval(slideNext, 7000);
};

const stopAutoSlide = function () {
  clearInterval(autoSlideInterval);
};

// Start auto-slide on page load
window.addEventListener("load", startAutoSlide);

// Pause auto-slide on button hover
[heroSliderPrevBtn, heroSliderNextBtn].forEach((btn) => {
  btn.addEventListener("mouseover", stopAutoSlide);
  btn.addEventListener("mouseout", startAutoSlide);
});



document.addEventListener('DOMContentLoaded', () => {
    let currentIndex = 0;
    const items = document.querySelectorAll('.hero .slider-item');
    const totalItems = items.length;

    function setActiveSlide(index) {
        items.forEach((item, idx) => {
            if (idx === index) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalItems;
        setActiveSlide(currentIndex);
    }

    // Change slides every 5 seconds
    setInterval(nextSlide, 5000);

    // Initialize the first slide
    setActiveSlide(currentIndex);
});


/** Parallax Effect */
const parallaxItems = document.querySelectorAll("[data-parallax-item]");
let x = 0, y = 0;

// Throttle function for performance optimization
const throttle = (callback, delay) => {
    let lastCall = 0;
    return (...args) => {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            callback(...args);
        }
    };
};

const handleMouseMove = (event) => {
    // Calculate the normalized mouse position with increased movement multiplier
    x = (event.clientX / window.innerWidth - 0.5) * -30;  
    y = (event.clientY / window.innerHeight - 0.5) * -30; 

    // Apply the parallax effect to each item
    parallaxItems.forEach((item) => {
        const speed = Number(item.dataset.parallaxSpeed) || 1;
        const offsetX = x * speed;
        const offsetY = y * speed;

        item.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
    });
};

// Attach the throttled event listener
window.addEventListener("mousemove", throttle(handleMouseMove, 16)); // ~60 fps
