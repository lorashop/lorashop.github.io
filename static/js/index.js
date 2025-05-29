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

// Ensure our code runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded, initializing...');
    
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

    // Initialize carousels after a slight delay to ensure DOM is completely processed
    setTimeout(function() {
      initializeCarousels();
    }, 100);

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

    bulmaSlider.attach();
});

// Function to initialize all carousels
function initializeCarousels() {
  console.log('Initializing carousels...');
  
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

  // Make sure elements exist before initializing
  var carousels = [];
  var generationCarousel = [];
  
  try {
    // Safe initialization - check if elements exist
    if (document.querySelectorAll('.carousel:not(#generation-carousel)').length > 0) {
      console.log('Initializing regular carousels');
      carousels = bulmaCarousel.attach('.carousel:not(#generation-carousel)', carouselOptions);
    }
    
    // Check if generation carousel exists
    if (document.getElementById('generation-carousel')) {
      console.log('Initializing generation carousel');
      generationCarousel = bulmaCarousel.attach('#generation-carousel', generationCarouselOptions);
    }
    
    // Add click events to custom navigation buttons - make it more robust
    document.querySelectorAll('.carousel-nav-left').forEach(function(navButton) {
      navButton.addEventListener('click', function() {
        // Find the closest carousel
        const carouselContainer = navButton.closest('.carousel-container');
        if (!carouselContainer) return;
        
        const carousel = carouselContainer.querySelector('.carousel');
        if (!carousel) return;
        
        // Find the carousel instance
        let carouselInstance = null;
        
        if (carousel.id === 'generation-carousel' && generationCarousel.length > 0) {
          carouselInstance = generationCarousel[0];
        } else {
          // Find in regular carousels
          carouselInstance = carousels.find(c => c && c.element === carousel);
        }
        
        if (carouselInstance) {
          carouselInstance.previous();
        }
      });
    });

    document.querySelectorAll('.carousel-nav-right').forEach(function(navButton) {
      navButton.addEventListener('click', function() {
        // Find the closest carousel
        const carouselContainer = navButton.closest('.carousel-container');
        if (!carouselContainer) return;
        
        const carousel = carouselContainer.querySelector('.carousel');
        if (!carousel) return;
        
        // Find the carousel instance
        let carouselInstance = null;
        
        if (carousel.id === 'generation-carousel' && generationCarousel.length > 0) {
          carouselInstance = generationCarousel[0];
        } else {
          // Find in regular carousels
          carouselInstance = carousels.find(c => c && c.element === carousel);
        }
        
        if (carouselInstance) {
          carouselInstance.next();
        }
      });
    });

    // Loop on each carousel initialized - check length first
    if (carousels.length > 0) {
      for(var i = 0; i < carousels.length; i++) {
        if (carousels[i]) {
          carousels[i].on('before:show', state => {
            console.log(state);
          });
        }
      }
    }
  } catch (error) {
    console.error('Error initializing carousels:', error);
  }
}
