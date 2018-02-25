$(document).ready(function(){
  $('.js-cart__item--remove').on('click', function(){
    var that = $(this);
    var variantId = that.data('remove');
    var cartCount = $('.js-cart-count').text();

    $.post('/cart/change.js', {
      quantity: 0,
      id: variantId,
    })
      .always(function() {
        $('#' + variantId).remove();
        $(`.cart__item--divider[data-remove="${variantId}"]`).remove();
        cartCount -= 1;
        $('.js-cart-count').text(cartCount);
      });
  })
})
// $('#' + variantId).remove();
