
$(document).ready(function(){
  /* Product Tag Filters - Good for any number of filters on any type of collection pages */
  var collFilters = jQuery('.coll-filter');
  collFilters.change(function() {
    var newTags = [];
    collFilters.each(function() {
      if (jQuery(this).val()) {
        newTags.push(jQuery(this).val());
      }
    });
    if (newTags.length) {
      var query = newTags.join('+');
      window.location.href = jQuery('{{ 'tag' | link_to_tag: 'tag' }}').attr('href').replace('/' + 'tag', '/' + query);
    }
    else {
      {% if collection.handle %}
      window.location.href = '/collections/{{ collection.handle }}';
      {% elsif collection.products.first.type == collection.title %}
      window.location.href = '{{ collection.title | url_for_type }}';
      {% elsif collection.products.first.vendor == collection.title %}
      window.location.href = '{{ collection.title | url_for_vendor }}';
      {% endif %}
    }
  });
  /*============================================================================
    Inline JS because collection liquid object is only available
    on collection pages and not external JS files
  ==============================================================================*/
  Shopify.queryParams = {};
  if (location.search.length) {
    for (var aKeyValue, i = 0, aCouples = location.search.substr(1).split('&'); i < aCouples.length; i++) {
      aKeyValue = aCouples[i].split('=');
      if (aKeyValue.length > 1) {
        Shopify.queryParams[decodeURIComponent(aKeyValue[0])] = decodeURIComponent(aKeyValue[1]);
      }
    }
  }

  $(function() {
    $('#SortBy')
      .val('{{ collection.sort_by | default: collection.default_sort_by }}')
      .bind('change', function() {
        Shopify.queryParams.sort_by = jQuery(this).val();
        location.search = jQuery.param(Shopify.queryParams);
      }
    );
  });



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
