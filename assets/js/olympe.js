/* =*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*

	#OLYMPE | Smart Coming Soon Template
	@Author		   Madeon08
	@Type          Javascript
	@Last Update   16:52 PM Sunday, February 15th, 2015

	TABLE OF CONTENTS
	---------------------------
	 1. Loading
	 2. Full screen
	 3. Inline Popup
	 4. Scroll Reveal
	 5. Countdown
	 6. Center welcome
	 7. Carousel
	 8. Map
	    8.1 Show/hide map
	 9. Tooltip
	10. Smooth scroll
	11. Newsletter
	12. Fade popup

  =*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=* */

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
		$('div.tlt').textillate({ in: { effect: 'fadeInUp', shuffle: true, delayScale: 1.5  } });
	}, 2000);
	
	setTimeout(function() {
	
	$(".tlt").addClass("fadeOut");
	$(".outer").addClass("fadeOut");
	}, 7000);
	
	setTimeout(function() {
	
	$(".tlt").addClass("display-none");
	$(".outer").addClass("display-none");
	}, 10000);
	
	setTimeout(function() {
		
		$("#brand-logo").addClass("fadeIn").removeClass("opacity-0");
		
	}, 9500);
	
	setTimeout(function() {
		
		$("#text-rotation").addClass("fadeIn").removeClass("opacity-0");
		$("#days-animation").addClass("fadeIn").removeClass("opacity-0");
		
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
		
	}, 10500);
	
	setTimeout(function() {
		
		$("#text-construction").addClass("fadeIn").removeClass("opacity-0");
		$("#hours-animation").addClass("fadeIn").removeClass("opacity-0");
		
	}, 11000);
	
	setTimeout(function() {
		
		$("#minutes-animation").addClass("fadeIn").removeClass("opacity-0");
		$(".scrollbott-2").addClass("slideInUp").removeClass("opacity-0");
		$(".control-video").addClass("slideInDown").removeClass("opacity-0");
		
	}, 6000);
	
	setTimeout(function() {
		
		$("#seconds-animation").addClass("fadeIn").removeClass("opacity-0");
		
	}, 6500);
	
	setTimeout(function() {
		
		$("#text-construction-2").addClass("fadeIn").removeClass("opacity-0");
		
	}, 7000);
	
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
		
		$(window).resize( function () {
		
		var screenWidth = $(window).width() + "px";
		var screenHeight = $(window).height() + "px";
		
		$("#coming-soon").css({
		width: screenWidth,
		height: screenHeight
		}); 
		
		 $.firefly({
		 	color: '#F1E7C0',
		 	minPixel: 1,
		 	maxPixel: 2,
		 	total : 1,
		 	on: '#wrapper-firefly'
		 });
		
		});
	
	}
	
/* ================================= */
/* :::::::: 3. Inline Popup :::::::: */
/* ================================= */

$('#inline-popups').magnificPopup({
  delegate: 'a',
  removalDelay: 100, //delay removal by X to allow out-animation
  callbacks: {
    beforeOpen: function() {
       this.st.mainClass = this.st.el.attr('data-effect');
    }
  },
  midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
});

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

        window.scrollReveal = new scrollReveal({ reset: true, move: '50px' });
    
    })();

/* ================================= */
/* ::::::::: 5. Countdown :::::::::: */
/* ================================= */

$('#countdown_dashboard').countDown({
		targetDate: {
			'day': 		30,
			'month': 	12,
			'year': 	2016,
			'hour': 	11,
			'min': 		13,
			'sec': 		0
		},
		omitWeeks: true
});

/* ================================= */
/* ::::::: 6. Center welcome ::::::: */
/* ================================= */

$(document).ready(function(){
	
	$(function(){
		
	 $.fn.center = function () {
		this.css("position","absolute");
		this.css("top", ( $(window).height() - this.height() ) / 2  + "px");
		this.css("left", ( $(window).width() - this.width() ) / 2 + "px");
		return this;
	}
	
		$(".welcomeblock").center();   // on page load div will be centered   
		$(".tlt").center();   // on page load div will be centered                                                
		$(window).resize(function(){ // whatever the screen size this
		   $(".welcomeblock").center();       // this will make it center when 
		   $(".tlt").center();       // this will make it center when 
		});                          // window resize happens
		
	});

});
		
/* ================================= */
/* :::::::::: 7. Carousel :::::::::: */
/* ================================= */

$('.carousel').carousel({
	  interval: 5000
})
	
/* ================================= */
/* :::::::::::: 8. Map ::::::::::::: */
/* ================================= */

 // When the window has finished loading create our google map below
		google.maps.event.addDomListener(window, 'load', init);
		google.maps.event.addDomListener(window, 'resize', init);
		
		function init() {
	
			var myLatlng = new google.maps.LatLng(49.6122021,6.1324549,17);
	
			// Basic options for a simple Google Map
			// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
			var mapOptions = {
			// How zoomed in you want the map to start at (always required)
			zoom: 11,
			scrollwheel: false,
			draggable: false,
			
			// The latitude and longitude to center the map (always required)
			center: myLatlng,
			
			// How you would like to style the map. 
			// This is where you would paste any style found on Snazzy Maps.
			styles: [	
			
					{	stylers:[			{hue:'#f1e7c0'},			{invert_lightness:true},			{saturation:-80},			{lightness:20},			{gamma:0}	]	},
					{		featureType:'water',		elementType:'geometry',		stylers:[			{color:'#333333'},]	},
					{'featureType':'landscape','stylers':[{'color':'#2B2D35'}]},]
				};
	
			var map = new google.maps.Map(document.getElementById('map'), mapOptions);
		
			var contentString = '<div class="info-content"><h2>We are here <small>28, Rue du Nord @ Luxembourg</small></h2><p>Located in the center of the city, lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam fermentum euismod erat, nec porta turpis fringilla sed. Morbi euismod metus sagittis, gravida orci id, tincidunt odio. Pellentesque habitant morbi tristique.</p></div>';
	
			var infowindow = new google.maps.InfoWindow({
			content: contentString
		});
	
			var marker = new google.maps.Marker({
			position: myLatlng,
			map: map,
			title: 'More informations'
		});
	
			google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map,marker);
		});
	
	}
		
/* ================================= */
/* ::::::: 8.1 Show/hide map ::::::: */
/* ================================= */	

jQuery(document).ready(function() {
	
	jQuery('a#map-location').click(function(){
		 jQuery('#map').removeClass("index999 index-999 display-none invisible").addClass('fadeIn visible');
		 jQuery('#close-map').addClass('sub-down');
		 
		 setTimeout(function() {
	
			$("#map").addClass("index999");
			}, 1);
			
		});

	jQuery('a#close-map-top').click(function(){
		 jQuery('#map').removeClass('fadeIn').addClass('fadeOut');
		 jQuery('#close-map').removeClass('sub-down');

setTimeout(function() {
	
			$("#map").addClass("display-none").removeClass("fadeOut");
		}, 600);
		
    });
	
	jQuery('a#info-gotop').click(function(){
		 $('html, body').animate({ scrollTop: 0 }, 'slow');
		
    });
});

/* ================================= */
/* :::::::::: 9. Tooltip ::::::::::: */
/* ================================= */

if (window.matchMedia("(min-width: 1025px)").matches) {	
			
	$(function () { $("[data-toggle='tooltip']").tooltip(); });

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