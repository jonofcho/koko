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

function addToCart(obj, that){

    that.attr('disabled', true);
    var productId = obj.productId;
    var variantTitle = obj.variantTitle;
    var productImage = obj.productImage;
    var productVendor = obj.productVendor;
    var productTitle = obj.productTitle;
    var productPrice = obj.productPrice;
    var productQuantity = obj.productQuantity;
    var postData = {
      quantity: productQuantity,
      id: productId,
    }
    console.log(productPrice);
    $.ajax({
      url: '/cart/add.js',
      type: 'POST',
      data: postData,
      dataType:"json",
    }).done(function(data){
      that.removeAttr('disabled');
      var existCheck = [];
      $('.js-navigation__cart-dropdown--card').each(function(){
        $(this);
        var cardId = $(this).data('card-id');
        existCheck.push(cardId)
      })
      console.log(productId);
      console.log(existCheck);
      if (existCheck.indexOf(productId) > -1) {
        var $currentProductQuantity = $(`.js-navigation__cart-dropdown--card--quantity[data-card-id="${productId}"]`);
        var currentQuantity = $currentProductQuantity.data('quantity');
        $currentProductQuantity.data('quantity', currentQuantity + productQuantity);
        $currentProductQuantity.text(currentQuantity + productQuantity);
      }
      else {
        console.log(productPrice);
      $('.navigation__cart-dropdown--cards--container').append(`<div class="navigation__cart-dropdown--item-details relative js-navigation__cart-dropdown--card">
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
        </div>`)
      }

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

  $(`.js-product-card__modal--add-to-cart[data-product-id="${targetId}"]`).attr('data-product-quantity', quantity);

}
