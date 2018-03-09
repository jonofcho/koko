

$(document).ready(function(){

  // $('.navigation__cart-dropdown--cards--container , .cart__item-list--container ').on('click', '.js-navigation__cart-dropdown--card--quantity--changer--apply', function(){
  //   var itemId = $(this).data('item-id');
  //   var quantity = $(`.js-navigation__cart-dropdown--card--quantity--changer[data-card-id='${itemId}']`).val();
  //   cartDropdownUpdateQuantity(itemId , quantity);
  //   $(`.navigation__cart-dropdown--card--quantity--changer--apply[data-item-id="${itemId}"]`).addClass('hide');
  //   $(`.navigation__cart-dropdown--card--quantity--changer--apply[data-item-id="${itemId}"].complete`).removeClass('hide');
  //   timeOut = setTimeout(function(){
  //     $(`.navigation__cart-dropdown--card--quantity--changer--apply[data-item-id="${itemId}"]`).removeClass('hide');
  //     $(`.navigation__cart-dropdown--card--quantity--changer--apply[data-item-id="${itemId}"].complete`).addClass('hide');
  //   }, 3000);
  // })

  $('.cart__item-details--quantity , .navigation__cart-dropdown').on('change','.js-navigation__dropdown--quantity--update', function(){
    var that = $(this);
    var itemId = that.data('item-id');
    var quantity = that.val();
    console.log('change');
    if (quantity == 0) {
      removeFromCart(itemId);
    }
    else {
      cartDropdownUpdateQuantity(itemId , quantity);
    }
  })

  $('.js-navigation__search-icon--container').on('click', function () {
    $('.search--container').addClass('active');
  })
  $('.search__close--container').on('click', function () {
    $('.search--container').removeClass('active');
  })

  $('.navigation__search-icon--container').on('mouseenter', function () {
    $('.navigation__searchbar--container--outer').removeClass('hide');
  })
  $('.theme__navigation').on('mouseleave', function () {
    $('.navigation__searchbar--container--outer').addClass('hide');
  })
  // $('.navigation__searchbar--container').on('mouseleave', function () {
  //   $('.navigation__searchbar--container').addClass('hide');
  // })

  $('.js-user__modal--exit').on('click', function(){
    $('.modal-overlay').trigger('click');
  })
  $('.js-user__register--open').on('click', function(){
    $('.modal-overlay').trigger('click');
    $('#register-modal').modal('open');
  })
  $('.js-user__login--open').on('click', function(){
    $('.modal-overlay').trigger('click');
    $('#login-modal').modal('open');
  })

  // $(".js-navigation__collapse").sideNav();
  $('.js-navigation__collapse').sideNav({
    menuWidth: 335, // Default is 300
    edge: 'right', // Choose the horizontal origin
    closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
    draggable: true, // Choose whether you can drag to open on touch screens,
    onOpen: function(el) {
      $('.side-nav').addClass('active');
    },
    onClose: function(el) {
      $('.side-nav').removeClass('active');
    }

  });

  $('.js-sidebar__submenu--trigger').sideNav({
    menuWidth: 335, // Default is 300
    edge: 'right', // Choose the horizontal origin
    closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
    draggable: true, // Choose whether you can drag to open on touch screens,
    // onOpen: function(el) {
    //   $('.side-nav').addClass('active');
    // },
    // onClose: function(el) {
    //   $('.side-nav').removeClass('active');
    // }

  });
  $('.js-sub-side-nav-close').on('click', function(){
    var $this = $(this);
    var handle = $this.data('target');
    $(`.drag-target[data-sidenav='${handle}']`).trigger('click');
  })
  $('.js-navigation__link').on('mouseenter', function(){

    var that = $(this);
    var handle = that.data('active');
    var count = that.data('count');
    if (count == true) {
      $('.js-navigation__dropdown').removeClass('open');
      $(`.js-navigation__dropdown[data-handle="${handle}"]`).addClass('open');
      $('.js-navigation__dropdown--container').addClass('open');
    }else{
      $('.js-navigation__dropdown').removeClass('open');
      $('.js-navigation__dropdown--container').removeClass('open');

    }
  })
  $('.js-theme__header--container').on('mouseleave', function(){
    $('.js-navigation__dropdown--container').removeClass('open');
  })
  $('.js-shop__mainlink').on('mouseenter', function(){
    var that = $(this);
    var handle = that.data('handle');
    $('.js-shop__mainlink').removeClass('open-flex');
    that.addClass('open-flex');
    $('.sub-links').removeClass('open');
    $(`.sub-links[data-handle="${handle}"]`).addClass('open');
  })
  $('.js-navigation__icon--outer-container--cart').on('mouseenter', function(){
    openCartDropdown()
  })
  $('.js-navigation__icon--outer-container--cart').on('mouseleave', function(){
    // console.log('asdfasdf left');
    // closeCartDropdown()
  })
})
