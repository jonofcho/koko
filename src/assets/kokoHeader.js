  // $(".js-navigation__collapse").sideNav();

    $('.js-navigation__collapse').sideNav({
      menuWidth: 335, // Default is 300
      edge: 'right', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true, // Choose whether you can drag to open on touch screens,
    });

    $('.js-sidebar__submenu--trigger').sideNav({
      menuWidth: 335, // Default is 300
      edge: 'right', // Choose the horizontal origin
      closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true, // Choose whether you can drag to open on touch screens,
    });
    $('.js-sub-side-nav-close').on('click', function(){
        var $this = $(this);
        var handle = $this.data('target');
      $(`.drag-target[data-sidenav='${handle}']`).trigger('click');
    })
$(document).ready(function(){
  $('.js-navigation__link').on('mouseenter', function(){

    var that = $(this);
    var handle = that.data('active');
    var count = that.data('count');
    if (count == true) {
      $('.js-navigation__dropdown').removeClass('open');
      $(`.js-navigation__dropdown[data-handle="${handle}"]`).addClass('open');
      $('.js-navigation__dropdown--container').addClass('open');
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

})
