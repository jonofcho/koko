

$(document).ready(function(){

  $('.js-added-to-cart__modal--exit').on('click', function(){
    closeMobileCartAlert();
  })

  $('.js-quantity--incrementor').on('click', function(){
    var that = $(this);
    var $quantity = that.siblings('.js-quantity--current');
    var currentQuantity = parseInt($quantity.text());
    currentQuantity += 1;
    // console.log(currentQuantity);
    updateProductQuantity($quantity , currentQuantity)
    $quantity.text(currentQuantity);
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

  })




  $('.js-product-card__modal--add-to-cart').on('click', function(){
    var that = $(this);
    product = {
      productId : that.data("variant-id"),
      productQuantity: that.data('product-quantity'),
    }
    // console.log(product);
    var mobile = that.data('mobile');
    addToCart(product, that , mobile)
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

  $('.navigation__cart-dropdown--cards--container').on('click', '.js-navigation__cart-dropdown--remove-item', function(){
    var that = $(this);
    var productId = that.data('card-id');
    // console.log('asdfsadf');
    removeFromCart(productId);
  })
  $('.js-product-card__modal--exit').on('click', function(){
    $('.modal-overlay').trigger('click');
  })
  $('.modal').modal({
     complete: function() {
        $('.product-card__modal--add-to-cart').removeClass('completed')
      }
  });
})
