
$(document).ready(function(){
  var cards = $('.js-collection__product-card');
  var filterObject = {
    "skin-type" : "",
    "skin-concern": "",
    "brand": "",
  }

  $('.js-collection__filter--selection').on('change', function(){
    var that = $(this);
    var selector = that.attr('name');
    var val = that.find(":selected").val();

    filterObject[selector] = val;
    console.log(filterObject);
    cards.addClass('hidden');
    var filteredCards = cards.filter(function(i , el){
      // console.log($(el));
      var tags = $(el).data('tags').toLowerCase();
      // console.log(i);
      return tags.indexOf(filterObject['skin-type']) > 0 || tags.indexOf(filterObject['skin-concern']) > 0 || tags.indexOf(filterObject['brand']) > 0;
    })
    console.log(filteredCards);
    filteredCards.addClass('open');

  })
  $('.js-collection__filter--clear').on('click', function(){
    // $('.js-collection__filter--selection').reset();
    // REMOVE HIDDEN FROM ALL PRODUCTS
    cards.removeClass('hidden');
  })
  $('.js-collection__filter--selection').on('click', function(e){
    e.preventDefault();
  })
})

$('.js-collection__filter--selection').sideNav({
  edge: 'left', // Choose the horizontal origin
  closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
  draggable: true, // Choose whether you can drag to open on touch screens,
});

$('.js-product__card--controls-add-to-cart').on('click', function(){
  var that = $(this);
  console.log(that);
  var productId = that.data('product-id');

  $.post('/cart/add.js', {
      quantity: 1,
      id: productId,
  }).always(function(){
    console.log('post complete');
  })
})
