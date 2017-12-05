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
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true, // Choose whether you can drag to open on touch screens,
    });



$(document).ready(function(){
  $('.js-navigation-link').on('mouseenter', function(){
    var that = $(this);
    var target = that.data('active');
    $('.js-dropdown--container').removeClass('active');
    $(`.js-dropdown--container[data-source="${target}"]`).addClass('active');
    $('.js-header__dropdown').fadeIn();
  })

  $('.js-dropdown__mainlink').on('mouseenter',function(){
    var that = $(this);
    var target = that.data('target');
    $('.js-dropdown__mainlink').children('span').removeClass('active');
    that.children('span').addClass('active');
    $('.js-dropdown__sublinks').removeClass('active');
    $(`.js-dropdown__sublinks[data-source="${target}"]`).addClass('active');
  })

  $('.js-theme__header--container').on('mouseleave', function(){
    $('.js-header__dropdown').fadeOut();
  })
})
