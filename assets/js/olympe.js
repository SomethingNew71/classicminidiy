/* ================================= */
/* :::::::::: 1. Loading ::::::::::: */
/* ================================= */

$(window).load(function() {

  setTimeout(function() {
    $("#logo-loading").addClass("zoomOut animated");
  }, 1000);

  setTimeout(function() {
    $(".globload").addClass("fadeOut animated");
  }, 2000);

  setTimeout(function() {
    $(".globload").addClass("display-none");
  }, 5000);

  setTimeout(function() {
    $('div.tlt').textillate({ in : {
        effect: 'fadeInUp',
        shuffle: true,
        delayScale: 1.5
      }
    });
  }, 2000);

  setTimeout(function() {

    $(".tlt").addClass("fadeOut");
    $(".outer").addClass("fadeOut");
  }, 1000);

  setTimeout(function() {

    $(".tlt").addClass("display-none");
    $(".outer").addClass("display-none");
  }, 3000);

  setTimeout(function() {

    $("#brand-logo").addClass("fadeIn").removeClass("opacity-0");

  }, 1000);

  setTimeout(function() {

    $("#text-rotation").addClass("fadeIn").removeClass("opacity-0");

    $(".demo1 .rotate").textrotator({
      animation: "dissolve",
      speed: 3500
    });

    $(".demo2 .rotate").textrotator({
      animation: "flip",
      speed: 1250
    });

    $(".demo3 .rotate").textrotator({
      animation: "flipCube",
      speed: 1500
    });

    $(".demo4 .rotate").textrotator({
      animation: "flipUp",
      speed: 1750
    });

    $(".demo5 .rotate").textrotator({
      animation: "spin",
      speed: 2000
    });

  }, 1200);

  setTimeout(function() {

    $("#text-construction").addClass("fadeIn").removeClass("opacity-0");

  }, 2000);

  setTimeout(function() {

    $(".scrollbott").addClass("slideInUp").removeClass("opacity-0");

  }, 10000);

});

/* ================================= */
/* :::::::: 2. Full screen ::::::::: */
/* ================================= */

$(document).ready(function() {
  fullScreenContainer();
});

function fullScreenContainer() {

  var screenWidth = $(window).width() + "px";
  var screenHeight = $(window).height() + "px";

  $("#coming-soon").css({
    width: screenWidth,
    height: screenHeight
  });

  $(window).resize(function() {

    var screenWidth = $(window).width() + "px";
    var screenHeight = $(window).height() + "px";

    $("#coming-soon").css({
      width: screenWidth,
      height: screenHeight
    });

  });

}

/* ================================= */
/* ::::::: 4. Scroll Reveal :::::::: */
/* ================================= */

(function($) {

  'use strict';

  // The starting defaults.
  var config = {
    after: '0.2s',
    over: '1.66s',
  };

  window.scrollReveal = new scrollReveal({
    reset: true,
    move: '50px'
  });

})();

/* ================================= */
/* ::::::: 6. Center welcome ::::::: */
/* ================================= */

$(document).ready(function() {

  $(function() {

    $.fn.center = function() {
      this.css("position", "absolute");
      this.css("top", ($(window).height() - this.height()) / 2 + "px");
      this.css("left", ($(window).width() - this.width()) / 2 + "px");
      return this;
    }

    $(".welcomeblock").center(); // on page load div will be centered
    $(".tlt").center(); // on page load div will be centered
    $(window).resize(function() { // whatever the screen size this
      $(".welcomeblock").center(); // this will make it center when
      $(".tlt").center(); // this will make it center when
    }); // window resize happens

  });

});

/* ================================= */
/* :::::::::: 7. Carousel :::::::::: */
/* ================================= */

$('.carousel').carousel({
  interval: 5000
})


/* ================================= */
/* :::::::::: 9. Tooltip ::::::::::: */
/* ================================= */

if (window.matchMedia("(min-width: 1025px)").matches) {

  $(function() {
    $("[data-toggle='tooltip']").tooltip();
  });

}

/* ================================= */
/* ::::::: 10. Smooth scroll ::::::: */
/* ================================= */

smoothScroll.init({
  speed: 800, // Integer. How fast to complete the scroll in milliseconds
  easing: 'easeInOutCubic', // Easing pattern to use
  updateURL: false, // Boolean. Whether or not to update the URL with the anchor hash on scroll
});

/* ================================= */
/* :::::::: 11. Newsletter ::::::::: */
/* ================================= */

jQuery(document).ready(function() {
  $("#notifyMe").notifyMe();
});

/* ================================= */
/* ::::::::: 12. Fade popup :::::::: */
/* ================================= */

new WOW().init();
