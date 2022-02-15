$(window).on('load', function () {
  $('.owl-carousel').owlCarousel({
    items: 1,
    margin: 40,
    loop: true,
    responsive: {
      768: {
        items: 2,
      },
      1200: {
        items: 3,
      },
    },
  });
});
