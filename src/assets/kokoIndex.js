// $(document).ready(function(){
  $('.js-index__carousel--container').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    // prevArrow: '<span class="arrows-black slick-prev arrows-product-grid-item"></span>',
    // nextArrow: '<span class="arrows-black slick-next arrows-product-grid-item"></span>',
    responsive: [
    {
       breakpoint: 989,
       settings: {
         slidesToShow: 2,
         slidesToScroll: 2,
         infinite: true,
         dots: true
       }
     }

     // You can unslick at a given breakpoint now by adding:
     // settings: "unslick"
     // instead of a settings object
   ]
  });
// })
