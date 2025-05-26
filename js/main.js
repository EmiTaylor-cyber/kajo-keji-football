// Main JavaScript for KKLFA website

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (!event.target.closest('.navbar') && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
    }
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Close mobile menu after clicking a link
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
        }
      }
    });
  });
  
  // Add animation to elements when they come into view
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  if (animateElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeIn');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
      observer.observe(element);
    });
  }
  
  // Form validation
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      let isValid = true;
      const requiredFields = form.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
          
          // Add error message if it doesn't exist
          let errorMessage = field.parentNode.querySelector('.error-message');
          if (!errorMessage) {
            errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'This field is required';
            errorMessage.style.color = 'red';
            errorMessage.style.fontSize = '0.875rem';
            errorMessage.style.marginTop = '0.25rem';
            field.parentNode.appendChild(errorMessage);
          }
        } else {
          field.classList.remove('error');
          const errorMessage = field.parentNode.querySelector('.error-message');
          if (errorMessage) {
            errorMessage.remove();
          }
        }
      });
      
      if (!isValid) {
        e.preventDefault();
      } else {
        // For demo purposes, show success message instead of submitting
        if (form.classList.contains('demo-form')) {
          e.preventDefault();
          
          const formContainer = form.parentNode;
          const successMessage = document.createElement('div');
          successMessage.className = 'success-message';
          successMessage.innerHTML = `
            <div class="text-center">
              <div class="success-icon">✓</div>
              <h3>Thank You!</h3>
              <p>Your form has been submitted successfully.</p>
              <button class="btn btn-primary mt-3 reset-form">Back to Form</button>
            </div>
          `;
          
          successMessage.style.animation = 'fadeIn 0.5s ease forwards';
          
          // Hide form and show success message
          form.style.display = 'none';
          formContainer.appendChild(successMessage);
          
          // Add event listener to reset button
          const resetButton = successMessage.querySelector('.reset-form');
          if (resetButton) {
            resetButton.addEventListener('click', function() {
              form.reset();
              form.style.display = 'block';
              successMessage.remove();
            });
          }
        }
      }
    });
    
    // Real-time validation
    const inputFields = form.querySelectorAll('input, textarea, select');
    inputFields.forEach(field => {
      field.addEventListener('blur', function() {
        if (field.hasAttribute('required') && !field.value.trim()) {
          field.classList.add('error');
        } else {
          field.classList.remove('error');
          const errorMessage = field.parentNode.querySelector('.error-message');
          if (errorMessage) {
            errorMessage.remove();
          }
        }
      });
    });
  });
  
  // Image gallery lightbox
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  
  if (galleryItems.length > 0 && lightbox) {
    let currentIndex = 0;
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxNext = lightbox.querySelector('.lightbox-next');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    
    const openLightbox = (index) => {
      currentIndex = index;
      const item = galleryItems[index];
      const imgSrc = item.querySelector('img').getAttribute('src');
      const caption = item.getAttribute('data-caption') || '';
      
      lightboxImage.setAttribute('src', imgSrc);
      lightboxCaption.textContent = caption;
      lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    };
    
    const closeLightbox = () => {
      lightbox.style.display = 'none';
      document.body.style.overflow = '';
    };
    
    const navigateGallery = (direction) => {
      currentIndex = (currentIndex + direction + galleryItems.length) % galleryItems.length;
      const item = galleryItems[currentIndex];
      const imgSrc = item.querySelector('img').getAttribute('src');
      const caption = item.getAttribute('data-caption') || '';
      
      lightboxImage.setAttribute('src', imgSrc);
      lightboxCaption.textContent = caption;
    };
    
    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => openLightbox(index));
    });
    
    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightboxNext) {
      lightboxNext.addEventListener('click', () => navigateGallery(1));
    }
    
    if (lightboxPrev) {
      lightboxPrev.addEventListener('click', () => navigateGallery(-1));
    }
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
      if (lightbox.style.display === 'flex') {
        if (e.key === 'Escape') {
          closeLightbox();
        } else if (e.key === 'ArrowRight') {
          navigateGallery(1);
        } else if (e.key === 'ArrowLeft') {
          navigateGallery(-1);
        }
      }
    });
  }
  
  // Tabs functionality
  const tabContainers = document.querySelectorAll('.tabs-container');
  
  tabContainers.forEach(container => {
    const tabButtons = container.querySelectorAll('.tab-button');
    const tabContents = container.querySelectorAll('.tab-content');
    
    tabButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to current button and content
        button.classList.add('active');
        tabContents[index].classList.add('active');
      });
    });
  });
  
  // Countdown timer for events
  const countdownElements = document.querySelectorAll('.countdown');
  
  countdownElements.forEach(element => {
    const targetDate = new Date(element.getAttribute('data-target-date')).getTime();
    
    if (isNaN(targetDate)) return;
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      if (distance < 0) {
        element.innerHTML = '<span class="expired">Event has started!</span>';
        return;
      }
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      element.innerHTML = `
        <div class="countdown-item">
          <span class="countdown-value">${days}</span>
          <span class="countdown-label">Days</span>
        </div>
        <div class="countdown-item">
          <span class="countdown-value">${hours}</span>
          <span class="countdown-label">Hours</span>
        </div>
        <div class="countdown-item">
          <span class="countdown-value">${minutes}</span>
          <span class="countdown-label">Minutes</span>
        </div>
        <div class="countdown-item">
          <span class="countdown-value">${seconds}</span>
          <span class="countdown-label">Seconds</span>
        </div>
      `;
    };
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
  });
});
