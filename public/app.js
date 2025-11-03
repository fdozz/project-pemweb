// Enhanced UI interactions and animations
document.addEventListener('DOMContentLoaded', () => {
  // Smooth carousel dragging with momentum
  document.querySelectorAll('.carousel').forEach(carousel => {
    let isDown = false;
    let startX;
    let scrollLeft;
    let velocity = 0;
    let momentum = 0;
    let lastX = 0;
    let lastTime = 0;

    carousel.addEventListener('mousedown', (e) => {
      isDown = true;
      carousel.style.cursor = 'grabbing';
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
      lastX = e.pageX;
      lastTime = Date.now();
      velocity = 0;
    });

    carousel.addEventListener('mouseleave', () => {
      isDown = false;
      carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mouseup', () => {
      isDown = false;
      carousel.style.cursor = 'grab';
      
      // Add momentum scrolling
      if (Math.abs(velocity) > 1) {
        momentum = velocity * 0.95;
        const momentumScroll = () => {
          if (Math.abs(momentum) > 0.5) {
            carousel.scrollLeft -= momentum;
            momentum *= 0.95;
            requestAnimationFrame(momentumScroll);
          }
        };
        momentumScroll();
      }
    });

    carousel.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 2;
      carousel.scrollLeft = scrollLeft - walk;
      
      // Calculate velocity for momentum
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime;
      const deltaX = e.pageX - lastX;
      
      if (deltaTime > 0) {
        velocity = deltaX / deltaTime * 16; // 60fps normalization
      }
      
      lastX = e.pageX;
      lastTime = currentTime;
    });

    // Set initial cursor
    carousel.style.cursor = 'grab';
  });

  // Enhanced header with scroll effects
  const header = document.querySelector('.navbar');
  if (header) {
    let lastScrollY = 0;
    let ticking = false;

    const updateHeader = () => {
      const scrollY = window.scrollY;
      
      if (scrollY > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
        header.style.backdropFilter = 'blur(20px)';
        header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
      } else {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
      }
      
      // Hide/show header on scroll direction
      if (scrollY > lastScrollY && scrollY > 200) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }
      
      lastScrollY = scrollY;
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick);
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements for scroll animations
  document.querySelectorAll('.row, .card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Enhanced card hover effects with video preview
  document.querySelectorAll('.card').forEach(card => {
    let hoverTimeout;
    const thumbnail = card.querySelector('.card-thumbnail');
    const preview = card.querySelector('.card-preview');
    const previewUrl = card.dataset.preview;
    
    card.addEventListener('mouseenter', () => {
      card.style.zIndex = '10';
      
      // Start preview after 1.5 seconds hover
      if (previewUrl && preview && thumbnail) {
        hoverTimeout = setTimeout(() => {
          thumbnail.style.opacity = '0';
          preview.style.display = 'block';
          preview.src = previewUrl;
        }, 1500);
      }
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.zIndex = '1';
      
      // Clear timeout and hide preview
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
      
      if (preview && thumbnail) {
        thumbnail.style.opacity = '1';
        preview.style.display = 'none';
        preview.src = '';
      }
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Loading states for images
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', () => {
      img.style.opacity = '1';
    });
    
    img.addEventListener('error', () => {
      img.style.opacity = '0.5';
      img.alt = 'Gambar tidak dapat dimuat';
    });
    
    // Set initial state
    if (!img.complete) {
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.3s ease';
    }
  });

  // Enhanced form interactions
  document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', () => {
      input.parentElement.style.transform = 'scale(1)';
    });
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    // ESC to close modals
    if (e.key === 'Escape') {
      const modal = document.getElementById('trailer-modal');
      if (modal && modal.style.display !== 'none') {
        closeTrailer();
      }
    }
    
    // Arrow keys for carousel navigation
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      const focusedCarousel = document.querySelector('.carousel:hover');
      if (focusedCarousel) {
        const scrollAmount = 300;
        if (e.key === 'ArrowLeft') {
          focusedCarousel.scrollLeft -= scrollAmount;
        } else {
          focusedCarousel.scrollLeft += scrollAmount;
        }
      }
    }
  });

  // Performance optimization: Lazy load images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  console.log('🎬 Nontonmantap loaded successfully!');
});
