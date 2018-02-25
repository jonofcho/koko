

$(document).ready(function(){

  $('.js-quantity--incrementor').on('click', function(){
    var that = $(this);
    var $quantity = that.siblings('.js-quantity--current');
    var currentQuantity = parseInt($quantity.text());
    currentQuantity += 1;
    updateProductQuantity($quantity , currentQuantity)
    $quantity.text(currentQuantity);
    console.log('click');
  })
  $('.js-quantity--decrementor').on('click', function(){
    var that = $(this);
    var $quantity = that.siblings('.js-quantity--current');
    var currentQuantity = parseInt($quantity.text());
    if (currentQuantity > 1) {
      currentQuantity -= 1;
    }
    updateProductQuantity($quantity, currentQuantity)
    $quantity.text(currentQuantity);
    console.log('click');
  })
  function updateProductQuantity($currentDiv , quantity){
    console.log('changed');
    var that = $currentDiv
    var targetId = that.data('product-id');
    console.log(quantity);
    $(`.js-product-card__modal--add-to-cart[data-product-id="${targetId}"]`).attr('data-product-quantity', quantity);

  }



  $('.js-product-card__modal--add-to-cart').on('click', function(){
    var that = $(this);
    product = {
      productId : that.data("product-id"),
      productImage :   that.data('product-image'),
      productVendor : that.data('product-vendor'),
      productTitle : that.data('product-title'),
      productPrice : that.data('product-price'),
      productQuantity: that.data('product-quantity'),
    }
    console.log(product);
    addToCart(product, that)
  })
  var $dropdown = $('.navigation__cart-dropdown');
  var timeOut;
  $dropdown.on('mouseleave', function(){
    var that = $(this);
    // timeOut = setTimeout(function(){
    //   console.log('timeOut');
    //   that.removeClass('active');
    // }, 3000);
    that.removeClass('active');

  })
  // $dropdown.on('mouseenter', function(){
  //   clearTimeout(timeOut);
  // })

  $('.js-navigation__cart-dropdown--remove-item').on('click', function(){
    var that = $(this);
    var productId = that.data('card-id');
    $.post('/cart/change.js', {
      quantity: 0,
      id: productId,
    }).done(function(){
      console.log('success');
      $(`.js-navigation__cart-dropdown--card[data-card-id="${productId}"]`).remove();
    }).fail(function(res , req){
      console.log(res);
      console.log(req);
      console.log('no bueno');
    }).always(function(){
      console.log('something happened');
      $(`.js-navigation__cart-dropdown--card[data-card-id="${productId}"]`).remove();

    })
  })
  $('.js-product-card__modal--exit').on('click', function(){
    $('.modal-overlay').trigger('click');
  })
})
$('.modal').modal({

});
