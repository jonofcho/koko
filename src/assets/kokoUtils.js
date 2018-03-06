

function openCartDropdown(){
  var $dropdown = $('.navigation__cart-dropdown');
  $dropdown.addClass('active');
  if (!$dropdown.is(":hover")) {
    timeOut = setTimeout(function(){
      console.log('timeOut');
      $dropdown.removeClass('active');
    }, 3000);
  }
  $dropdown.on('mouseenter', function(){
    clearTimeout(timeOut);
  })
}
function closeCartDropdown(){
  var $dropdown = $('.navigation__cart-dropdown');
  $dropdown.removeClass('active');

}

function openMobileCartAlert(){
  $('.product__added-to-cart--alert--container').addClass('active');
  // timeOut = setTimeout(function(){
  //   console.log('timeOut');
  //   $('.product__added-to-cart--alert--container').removeClass('active');
  // }, 4000);
}
function closeMobileCartAlert(){
  $('.product__added-to-cart--alert--container').removeClass('active');

}

function addToCart(obj, that, mobile){
  console.log(mobile);
    that.attr('disabled', true);
    var productId = obj.productId;
    var productQuantity = obj.productQuantity;
    var postData = {
      quantity: productQuantity,
      id: productId,
    }
    // console.log(productPrice);
    $.ajax({
      url: '/cart/add.js',
      type: 'POST',
      data: postData,
      dataType:"json",
    }).done(function(data){
      openMobileCartAlert();

      that.removeAttr('disabled');

      var cartItems = "";
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
        var items = data.items;
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          var productTitle = item.product_title;
          var variantTitle = item.variant_title;
          var productImage = item.image;
          var productVendor = item.vendor;
          var productPrice = item.price;
          productPrice = productPrice/100;
          productPrice = "$" + productPrice.toFixed(2);

          var productQuantity = item.quantity;
          cartItems += `<div class="navigation__cart-dropdown--item-details relative js-navigation__cart-dropdown--card">
              <div class="navigation__cart-dropdown--added-item-image">
                <img class="width--full" src="${productImage}" alt="">
              </div>
              <div class="navigation__cart-dropdown--item--detail--container">
                <div class="mright-8">
                  <div class="flex justify-between text--small text--bold mbot-8">
                    <p class-"js-navigation__cart-dropdown--item--vendor">${productVendor}</p>
                  </div>
                  <div class="text--semi-small mbot-8">
                    <p class="mbot-8 js-navigation__cart-dropdown--item--title">${productTitle}</p>
                    <p>${variantTitle}</p>
                  </div>
                  <p class="text--smaller text--reduced text-lighter-grey js-navigation__cart-dropdown--item--quantity">QTY: ${productQuantity}</p>
                </div>
                <div class="">
                  <p class="text--bold text--small js-navigation__cart-dropdown--item--price">${productPrice}</p>
                </div>
                <div class="navigation__cart-dropdown--remove-item">
                  <img src="//cdn.shopify.com/s/files/1/2526/6552/t/2/assets/icon--close.svg?5336051900686237504" alt="">
                </div>
              </div>
            </div>`
        }
        $('.navigation__cart--dropdown--total-price').text(totalPrice);
        $('.navigation__cart-dropdown--cards--container').html(cartItems)

      })


      // var existCheck = [];
      // $('.js-navigation__cart-dropdown--card').each(function(){
      //   $(this);
      //   var cardId = $(this).data('card-id');
      //   existCheck.push(cardId)
      // })
      // // console.log(productId);
      // // console.log(existCheck);
      // if (existCheck.indexOf(productId) > -1) {
      //   var $currentProductQuantity = $(`.js-navigation__cart-dropdown--card--quantity[data-card-id="${productId}"]`);
      //   var currentQuantity = $currentProductQuantity.data('quantity');
      //   $currentProductQuantity.data('quantity', currentQuantity + productQuantity);
      //   $currentProductQuantity.text(currentQuantity + productQuantity);
      // }
      // else {
      //   // console.log(productPrice);
      // $('.navigation__cart-dropdown--cards--container').append()
      // }

      // $('.js-navigation__cart-dropdown--card').each(function(){
      //     console.log('asdf');
      //     var cardId = that.data('card-id');
      //     if (that.data('card-id') === productId) {
      //
      //       return false;
      //     }
      //
      //     return false;
      //   })

        openCartDropdown();

    }).fail(function(data){
      console.log(data);
      console.log('fail');
    }).always(function(data){
      console.log('post complete');
    })

}
function updateProductQuantity($currentDiv , quantity){

  var that = $currentDiv
  var targetId = that.data('product-id');
  console.log(quantity);
  $(`.js-product-card__modal--add-to-cart[data-variant-id="${targetId}"]`).attr('data-product-quantity', quantity);

}
