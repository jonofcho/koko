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
        $.ajax({
          url: '/cart.js',
          type: 'GET',
          // data: postData,
          // dataType:"json",
        }).done(function(data){
          var data = JSON.parse(data);
          var totalPrice = data.total_price;
          totalPrice = totalPrice/100;
          totalPrice = "$" + totalPrice.toFixed(2);
          var totalItems = data.item_count;
          $('.js-cart-mobile--checkout--total-items').text(totalItems + ' items');
          $('.js-cart-mobile--checkout--total-price').text(totalPrice);
        })
      });
  })
})
// $('#' + variantId).remove();
