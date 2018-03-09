

function openCartDropdown(){
  var $dropdown = $('.navigation__cart-dropdown');
  $dropdown.addClass('active');
  if (!$dropdown.is(":hover")) {
    timeOut = setTimeout(function(){
      console.log('timeOut');
      $dropdown.removeClass('active');
    }, 8000);
    $dropdown.on('mouseenter', function(){
      clearTimeout(timeOut);
    })
  }
  // $dropdown.on('mouseenter', function(){
  //   clearTimeout(timeOut);
  // })
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

function updateCartDropdown(){
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
    var cartItems = "";
    console.log(data);
    var items = data.items;
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var itemId = item.id;
      var productTitle = item.product_title;
      var variantTitle = item.variant_title;
      var productImage = item.image;
      var productVendor = item.vendor;
      var productPrice = item.price;
      var productUrl = item.url;
      productPrice = productPrice/100;
      productPrice = "$" + productPrice.toFixed(2);

      var productQuantity = item.quantity;
      cartItems += `<div class="navigation__cart-dropdown--item-details relative js-navigation__cart-dropdown--card" data-card-id="${itemId}">

        <div class="navigation__cart-dropdown--remove-item js-navigation__cart-dropdown--remove-item" data-card-id="${itemId}">
          <img src="//cdn.shopify.com/s/files/1/2526/6552/t/2/assets/icon--close.svg?5336051900686237504" alt="">
        </div>
        <div class="flex">
          <a href="${productUrl}">
            <div class="navigation__cart-dropdown--added-item-image">
              <img class="width--full" src="${productImage}" alt="">
            </div>
          </a>
          <div class="navigation__cart-dropdown--item--detail--container js-navigation__cart-dropdown--item--detail--container">
            <div class="mright-8">
              <div class="flex justify-between text--small text--bold mbot-8">
                <p>${productVendor}</p>
              </div>
              <div class="text--semi-small mbot-8">
                <p class="mbot-8">${productTitle}</p>
                <p>${variantTitle}</p>
              </div>
              <div class="flex-center-between width--full">
                <div class="flex-center">
                  <p class="text--smaller text--reduced text-lighter-grey">QTY:</p>
                   <input class="js-navigation__cart-dropdown--card--quantity--changer navigation__cart-dropdown--card--quantity--changer js-navigation__cart-dropdown--card--quantity" type="number" name="" value="${productQuantity}" data-card-id="${itemId}" data-quantity="${productQuantity}">
                </div>
                <div class="">
                  <button type="button" name="button" class="navigation__cart-dropdown--card--quantity--changer--apply js-navigation__cart-dropdown--card--quantity--changer--apply" data-item-id="${itemId}">CHANGE</button>
                  <button type="button" name="button" class="navigation__cart-dropdown--card--quantity--changer--apply complete hide" data-item-id="${itemId}">CHANGED</button>
                </div>
              </div>
            </div>
            <div class="">
              <p class="text--bold text--small">${productPrice}</p>
            </div>
          </div>
        </div>
      </div>`
    }
    $('.navigation__cart--dropdown--total-price').text(totalPrice);
    $('.navigation__cart-dropdown--cards--container').html(cartItems);
  })
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
      if (mobile) {
        location.href = "/cart"
      }
      // openMobileCartAlert();

      that.removeAttr('disabled');
      that.addClass('completed');
      timeOut = setTimeout(function(){
        that.removeClass('completed');
      }, 3000);
      updateCartDropdown();
      openCartDropdown();

    }).fail(function(data){
      console.log(data);
      console.log('fail');
    }).always(function(data){
      console.log('post complete');
    })

}
function cartDropdownUpdateQuantity(productId , quantity){
  $.post('/cart/change.js', {
    quantity: quantity,
    id: productId,
  }).done(function(data){
    var data = JSON.parse(data);
    var totalPrice = data.total_price;
    totalPrice = totalPrice/100;
    totalPrice = "$" + totalPrice.toFixed(2);
    $('.navigation__cart--dropdown--total-price').text(totalPrice);
    if (location.href.indexOf('cart') > -1) {
      location.reload();
    }
  })
}
function updateProductQuantity($currentDiv , quantity){

  var that = $currentDiv
  var targetId = that.data('product-id');
  console.log(quantity);
  $(`.js-product-card__modal--add-to-cart[data-variant-id="${targetId}"]`).attr('data-product-quantity', quantity);

}
