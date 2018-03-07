
$(document).ready(function(){
  $('.collection__filter--selection--mobile option').on('click', function(){
    console.log('click');
    $('.collection__filter--selection--mobile').trigger('change');
  })


  var cards = $('.js-collection__product-card');
  var filterObject = {
    // "skin-type" : "",
    "skin-concern": "",
    "brand": "",
  }



  $('.collection__vendor--checkbox--mobile').on('change', function() {
     $('.collection__vendor--checkbox--mobile').not($(this)).prop('checked', false);
     var that = $(this);
     var selector = that.attr('name');
     var val = that.val();
     if (that.prop('checked') == false) {
       val = "";
     }
     filterObject[selector] = val;
     // console.log(filterObject);
     cards.removeClass('open');

     cards.addClass('hidden');
     var filteredCards = cards.filter(function(i , el){
       // console.log($(el));
       var tags = $(el).data('tags').toLowerCase();
       var vendor = $(el).data('vendor').toLowerCase();
       // console.log(i);
       // console.log(tags);
       // console.log(filterObject['skin-concern']);
       // tags.indexOf(filterObject['skin-type']) > 0 ||
       if (filterObject['brand'].length > 0) {

         return tags.indexOf(filterObject['skin-concern']) > -1 && vendor == filterObject['brand'];
       }
       else {
         return tags.indexOf(filterObject['skin-concern']) > -1;
       }
     })
     console.log(filteredCards);

     filteredCards.addClass('open');
     // if (filteredCards.length() == 0) {
     //   console.log('none found');
     // }
  });

  $('.collection__tag--checkbox--mobile').on('change', function() {
     $('.collection__tag--checkbox--mobile').not(this).prop('checked', false);
     var that = $(this);
     var selector = that.attr('name');
     var val = that.val();
     if (that.prop('checked') == false) {
       val = "";
     }
     filterObject[selector] = val;
     // console.log(filterObject);
     cards.removeClass('open');

     cards.addClass('hidden');
     var filteredCards = cards.filter(function(i , el){
       // console.log($(el));
       var tags = $(el).data('tags').toLowerCase();
       var vendor = $(el).data('vendor').toLowerCase();
       // console.log(i);
       // console.log(tags);
       // console.log(filterObject['skin-concern']);
       // tags.indexOf(filterObject['skin-type']) > 0 ||
       if (filterObject['brand'].length > 0) {

         return tags.indexOf(filterObject['skin-concern']) > -1 && vendor == filterObject['brand'];
       }
       else {
         return tags.indexOf(filterObject['skin-concern']) > -1;
       }
     })
     console.log(filteredCards);

     filteredCards.addClass('open');
  });



  $('.js-collection__filter--selection').on('change', function(){
    var that = $(this);
    var selector = that.attr('name');
    var val = that.find(":selected").val();

    filterObject[selector] = val;
    // console.log(filterObject);
    cards.removeClass('open');

    cards.addClass('hidden');
    var filteredCards = cards.filter(function(i , el){
      // console.log($(el));
      var tags = $(el).data('tags').toLowerCase();
      var vendor = $(el).data('vendor').toLowerCase();
      // console.log(i);
      // console.log(tags);
      // console.log(filterObject['skin-concern']);
      // tags.indexOf(filterObject['skin-type']) > 0 ||
      if (filterObject['brand'].length > 0) {

        return tags.indexOf(filterObject['skin-concern']) > -1 && vendor == filterObject['brand'];
      }
      else {
        return tags.indexOf(filterObject['skin-concern']) > -1;
      }
    })
    console.log(filteredCards);

    filteredCards.addClass('open');

  })
  $('.js-collection__filter--clear').on('click', function(){
    // $('.js-collection__filter--selection').reset();
    // REMOVE HIDDEN FROM ALL PRODUCTS
    cards.removeClass('hidden');
    cards.removeClass('open');

  })
  $('.js-collection__filter--selection').on('click', function(e){
    e.preventDefault();
  })
})

$('.js-collection__filter--selection--mobile').sideNav({
  edge: 'left', // Choose the horizontal origin
  closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
  draggable: true, // Choose whether you can drag to open on touch screens,
  onOpen: function(el) {
    $('.side-nav').addClass('active');
  },
  onClose: function(el) {
    $('.side-nav').removeClass('active');
  }

});
