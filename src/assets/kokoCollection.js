$(document).ready(function(){
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


  })
  $('.js-collection__filter--clear').on('click', function(){
    $('.js-collection__filter--selection').reset();
    // REMOVE HIDDEN FROM ALL PRODUCTS
  })
})
