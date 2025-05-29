window.HELP_IMPROVE_VIDEOJS = false;
/*
var INTERP_BASE = "https://homes.cs.washington.edu/~kpar/nerfies/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}
*/

$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");
    });

    // Back to top button functionality
    const backToTopButton = $("#back-to-top");
    
    // Show/hide back to top button based on scroll position
    $(window).scroll(function() {
      if ($(this).scrollTop() > 300) {
        backToTopButton.css('display', 'flex');
      } else {
        backToTopButton.css('display', 'none');
      }
    });
    
    // Smooth scroll to top when back to top button is clicked
    backToTopButton.click(function(e) {
      e.preventDefault();
      $('html, body').animate({scrollTop: 0}, 800);
      return false;
    });

    // Highlight active navigation menu item based on scroll position
    $(window).on('scroll', function() {
      let scrollPosition = $(this).scrollTop();
      
      // Check position and highlight the appropriate nav item
      $('.navbar-item').each(function() {
        const target = $($(this).attr('href'));
        if (target.length && target.position().top <= scrollPosition + 200 && 
            target.position().top + target.outerHeight() > scrollPosition + 200) {
          $('.navbar-item').removeClass('has-text-weight-bold');
          $(this).addClass('has-text-weight-bold');
        }
      });
    });

    // Smooth scroll for anchor links
    $('.navbar-item').on('click', function(e) {
      if (this.hash !== '') {
        e.preventDefault();
        const hash = this.hash;
        $('html, body').animate({
          scrollTop: $(hash).offset().top - 70
        }, 800);
      }
    });

    // Initialize generation carousel with specific options
    var generationCarouselOptions = {
      slidesToScroll: 1,
      slidesToShow: 1,
      loop: true,
      infinite: true,
      autoplay: false,
      pagination: true,
      navigationSwipe: true,
      breakpoints: [
        { changePoint: 480, slidesToShow: 1, slidesToScroll: 1 },
        { changePoint: 768, slidesToShow: 1, slidesToScroll: 1 }
      ]
    };

    // Initialize all carousels with standard options
    var carouselOptions = {
      slidesToScroll: 1,
      slidesToShow: 1,
      loop: true,
      infinite: true,
      autoplay: false,
      pagination: true,
      navigationSwipe: true,
      breakpoints: [
        { changePoint: 480, slidesToShow: 1, slidesToScroll: 1 },
        { changePoint: 768, slidesToShow: 1, slidesToScroll: 1 }
      ]
    };

    // Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel:not(#generation-carousel)', carouselOptions);
    
    // Initialize the generation carousel separately
    var generationCarousel = bulmaCarousel.attach('#generation-carousel', generationCarouselOptions);

    // Add click events to custom navigation buttons
    document.querySelectorAll('.carousel-nav-left').forEach(function(navButton, index) {
      navButton.addEventListener('click', function() {
        // Find the closest carousel
        const carouselContainer = navButton.closest('.carousel-container');
        const carousel = carouselContainer.querySelector('.carousel');
        const carouselInstance = carousels.find(c => c.element === carousel) || 
                                 (carousel.id === 'generation-carousel' ? generationCarousel[0] : null);
        
        if (carouselInstance) {
          carouselInstance.previous();
        }
      });
    });

    document.querySelectorAll('.carousel-nav-right').forEach(function(navButton, index) {
      navButton.addEventListener('click', function() {
        // Find the closest carousel
        const carouselContainer = navButton.closest('.carousel-container');
        const carousel = carouselContainer.querySelector('.carousel');
        const carouselInstance = carousels.find(c => c.element === carousel) || 
                                 (carousel.id === 'generation-carousel' ? generationCarousel[0] : null);
        
        if (carouselInstance) {
          carouselInstance.next();
        }
      });
    });

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
      // Add listener to event
      carousels[i].on('before:show', state => {
        console.log(state);
      });
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
      // bulmaCarousel instance is available as element.bulmaCarousel
      element.bulmaCarousel.on('before-show', function(state) {
        console.log(state);
      });
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    // preloadInterpolationImages();
    /*
    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);
    */
    bulmaSlider.attach();

    // Add fade-in animation to images on scroll
    const fadeInElements = document.querySelectorAll('.container img');
    
    const fadeInOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px"
    };
    
    const fadeInObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        }
        entry.target.style.opacity = "1";
        observer.unobserve(entry.target);
      });
    }, fadeInOptions);
    
    fadeInElements.forEach(image => {
      image.style.opacity = "0";
      image.style.transition = "opacity 0.8s ease-in-out";
      fadeInObserver.observe(image);
    });
});
