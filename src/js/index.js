document.addEventListener("DOMContentLoaded", function(event) {
    // Header Nav

    var burger = document.querySelector('.header__burger');
    var nav = document.querySelector('.nav');

    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Swiper

    const swiper = new Swiper('.swiper-container', {
        loop: false,
        centerSlides: true,
        centerSlidesBounds: true,
        slidesPerView: 1,
        spaceBetween: 20,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        navigation: {
          nextEl: '.section-gallery__btn-next',
          prevEl: '.section-gallery__btn-prev',
        },
        breakpoints: {
            480: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 40,
            }
        },
      });
});
