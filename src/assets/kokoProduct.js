$(document).ready(function(){
  $('.js-product__card--controls--quick-view').on('click', function(){
    var that = $(this);
    var id = that.data('id');
    console.log(id);
    $('.product-card__modal--inner').addClass('hide');
    $(`.product-card__modal--inner#${id}`).removeClass('hide');

  })
  $('.js-pdp__add-to-cart--details--mobile').on('click', function(){
    $('.pdp__add-to-cart--details--text--mobile').addClass('active');
  })

  $('.pdp__variant--container.not').on('click', function(){
    var that = $(this);
    var productId = that.data('product-id');
    var variantId = that.data('variant-id');
    var variantTitle = that.data('variant-title');
    $('.pdp__variant--container.not').removeClass('active');
    that.addClass('active');
    $(`.js-product-card__modal--add-to-cart[data-product-id="${productId}"]`).attr('data-variant-id', variantId);
    $(`.js-product-card__modal--add-to-cart[data-product-id="${productId}"]`).attr('data-variant-title', variantTitle);
  })
})
