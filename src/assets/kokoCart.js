$(document).ready(function(){
  $('.js-cart__item--remove').on('click', function(){
    var that = $(this);
    var variantId = that.data('remove');
    $.post('/cart/change.js', {
      quantity: 0,
      id: variantId,
    })
      .always(function() {
        $('#' + variantId).remove();
      });
  })
})
// $('#' + variantId).remove();
