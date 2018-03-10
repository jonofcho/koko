$(document).ready(function(){
  $('.js-cart__gift--cta').on('click', function(){
    var that = $(this);
    var variantId = that.data('variant-id')
    var postData = {
      quantity: 1,
      id: variantId,
    }
    // console.log(productPrice);
    $.ajax({
      url: '/cart/add.js',
      type: 'POST',
      data: postData,
      dataType:"json",
    }).done(function(data){
      location.href = "/cart";
    })

  })
  $.ajax({
    url: '/cart.js',
    type: 'GET',
    // data: postData,
    // dataType:"json",
  }).done(function(data){
    var data = JSON.parse(data);
    var totalPrice = data.total_price;
    console.log(totalPrice);
    console.log(totalPrice / 5000);

    var giftMax =   Math.floor(totalPrice / 5000);
    var giftCounter = 0;
    var items = data.items;
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var productTitle = item.product_title;
      if (productTitle.indexOf('Gift') > -1) {
        giftCounter += item.quantity;
      }
    }
    console.log(giftMax);
    console.log(giftCounter);
    if ( giftCounter >= giftMax ) {
      $('.cart__gifts--container').remove();
    }

  })

  // $('.navigation__cart-dropdown--cards--container , .cart__item-list--container ').on('click', '.js-cart-dropdown--card--quantity--changer--apply', function(){
  //   var itemId = $(this).data('item-id');
  //   var quantity = $(`.js-cart-dropdown--card--quantity--changer[data-card-id='${itemId}']`).val();
  //   cartDropdownUpdateQuantity(itemId , quantity);
  //   $(`.navigation__cart-dropdown--card--quantity--changer--apply[data-item-id="${itemId}"]`).addClass('hide');
  //   $(`.navigation__cart-dropdown--card--quantity--changer--apply[data-item-id="${itemId}"].complete`).removeClass('hide');
  //   timeOut = setTimeout(function(){
  //     $(`.navigation__cart-dropdown--card--quantity--changer--apply[data-item-id="${itemId}"]`).removeClass('hide');
  //     $(`.navigation__cart-dropdown--card--quantity--changer--apply[data-item-id="${itemId}"].complete`).addClass('hide');
  //   }, 3000);
  //   location.href="/cart"
  // })
  // console.log('asdf');
  // $.ajax({
  //   url: '/admin/products/534848733220.json',
  //   type: 'GET',
  //   // data: postData,
  //   // dataType:"json",
  // }).done(function(data){
  //   console.log(data);
  // })


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
          if (location.href.indexOf('cart') > -1) {
            location.href = "/cart";
          }
        })
      });
  })
})
// $('#' + variantId).remove();
