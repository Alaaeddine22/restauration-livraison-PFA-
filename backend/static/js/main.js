document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  
    // Initialize PureCounter
    new PureCounter();
  
    // Initialize GLightbox
    const lightbox = GLightbox({
      selector: '.glightbox',
      touchNavigation: true,
      loop: true,
      autoplayVideos: true
    });
  
    // Initialize all Swiper sliders
    document.querySelectorAll('.init-swiper').forEach(swiperEl => {
      const config = JSON.parse(swiperEl.querySelector('.swiper-config').textContent);
      new Swiper(swiperEl, config);
    });
  
    // Scroll top button
    const scrollTop = document.getElementById('scroll-top');
    if (scrollTop) {
      window.addEventListener('scroll', function() {
        if (window.pageYOffset > 100) {
          scrollTop.classList.add('active');
        } else {
          scrollTop.classList.remove('active');
        }
      });
      
      scrollTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  
    // Mobile nav toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navmenu = document.getElementById('navmenu');
    
    if (mobileNavToggle && navmenu) {
      mobileNavToggle.addEventListener('click', function(e) {
        e.preventDefault();
        navmenu.classList.toggle('mobile-nav-active');
        this.classList.toggle('bi-list');
        this.classList.toggle('bi-x');
      });
    }
  
    // Smooth scrolling for navigation links
    document.querySelectorAll('#navmenu a').forEach(navLink => {
      navLink.addEventListener('click', function(e) {
        if (this.hash !== "") {
          e.preventDefault();
          
          const target = document.querySelector(this.hash);
          if (target) {
            window.scrollTo({
              top: target.offsetTop,
              behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navmenu.classList.contains('mobile-nav-active')) {
              navmenu.classList.remove('mobile-nav-active');
              mobileNavToggle.classList.toggle('bi-list');
              mobileNavToggle.classList.toggle('bi-x');
            }
          }
        }
      });
    });
  
    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
      window.addEventListener('load', function() {
        setTimeout(function() {
          preloader.style.opacity = '0';
          setTimeout(function() {
            preloader.style.display = 'none';
          }, 500);
        }, 500);
      });
    }
  
    // Form validation and submission
    document.querySelectorAll('.php-email-form').forEach(form => {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const action = this.getAttribute('action');
        const formMessages = {
          loading: this.querySelector('.loading'),
          error: this.querySelector('.error-message'),
          success: this.querySelector('.sent-message')
        };
        
        if (!action) {
          displayError(formMessages, 'The form action property is not set!');
          return;
        }
        
        formMessages.loading.style.display = 'block';
        formMessages.error.style.display = 'none';
        formMessages.success.style.display = 'none';
        
        fetch(action, {
          method: 'POST',
          body: formData
        })
        .then(response => {
          if (response.ok) {
            return response.text();
          }
          throw new Error('Network response was not ok.');
        })
        .then(data => {
          formMessages.loading.style.display = 'none';
          formMessages.success.style.display = 'block';
          this.reset();
        })
        .catch(error => {
          formMessages.loading.style.display = 'none';
          displayError(formMessages, error.message);
        });
      });
    });
    
    function displayError(formMessages, error) {
      formMessages.error.innerHTML = error;
      formMessages.error.style.display = 'block';
    }
  
    // Dropdown animations
    document.querySelectorAll('.dropdown > a').forEach(dropdownToggle => {
      dropdownToggle.addEventListener('click', function(e) {
        if (document.querySelector('.mobile-nav-active')) {
          e.preventDefault();
          this.nextElementSibling.classList.toggle('dropdown-active');
        }
      });
    });
  
    // Hero image animation
    const heroImg = document.querySelector('.hero-img img');
    if (heroImg) {
      heroImg.classList.add('animated');
    }
  
    // Add animation to menu items on scroll
    const menuItems = document.querySelectorAll('.menu-item');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });
  
    menuItems.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      item.style.transition = 'all 0.5s ease';
      observer.observe(item);
    });
  
    // Animate stats when they come into view
    const statsSection = document.getElementById('stats');
    if (statsSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const counters = document.querySelectorAll('.purecounter');
            counters.forEach(counter => {
              const target = +counter.getAttribute('data-purecounter-end');
              const duration = +counter.getAttribute('data-purecounter-duration') || 2;
              const start = +counter.getAttribute('data-purecounter-start') || 0;
              const increment = target / (duration * 60);
              
              let current = start;
              const timer = setInterval(() => {
                current += increment;
                counter.textContent = Math.floor(current);
                if (current >= target) {
                  counter.textContent = target;
                  clearInterval(timer);
                }
              }, 1000 / 60);
            });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
  
      observer.observe(statsSection);
    }
  });