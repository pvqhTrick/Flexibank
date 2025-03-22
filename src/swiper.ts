import { animationSlide } from './gasp';

export const setupSwiper = () => {
  const defaultSetting = {
    loop: true,
    autoHeight: true,
    spaceBetween: 20,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    on: {
      init: (el: any) => animationSlide(el.slides[el.activeIndex], 0),
      slideChangeTransitionStart: (el: any) => animationSlide(el.slides[el.activeIndex], 0),
    },
    autoplay: {
      delay: 5000000,
    },
  };
  new Swiper('.bank-service-swiper', {
    ...defaultSetting,
    breakpoints: {
      1366: {
        slidesPerView: 4,
      },
      1024: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 2,
      },
      500: {
        slidesPerView: 1,
      },
    },
  });

  // Swiper('.swiper-section-contact', {
  //   ...defaultSetting,
  //   slidesPerView: 2,
  //   breakpoints: {
  //     1366: {
  //       slidesPerView: 5,
  //     },
  //     1024: {
  //       slidesPerView: 4,
  //     },
  //     768: {
  //       slidesPerView: 3,
  //     },
  //     500: {
  //       slidesPerView: 2,
  //     },
  //   },
  // });

  // Swiper('.related-swiper', {
  //   ...defaultSetting,
  //   slidesPerView: 1,
  //   breakpoints: {
  //     1024: {
  //       slidesPerView: 3,
  //     },
  //     640: {
  //       slidesPerView: 2,
  //     },
  //   },
  // });
};
