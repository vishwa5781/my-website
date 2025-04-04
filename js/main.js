// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded - website initialization');
  
  // Initialize preloader
  setTimeout(function() {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    setTimeout(function() {
      preloader.style.display = 'none';
    }, 500);
  }, 1000);
  
  // Initialize navbar behavior
  const navbar = document.getElementById('mainNav');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-shrink');
    } else {
      navbar.classList.remove('navbar-shrink');
    }
  });
  
  // Initialize typing effect
  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    const typed = new Typed('#typing-text', {
      strings: [
        'AI/ML Engineer',
        'Deep Learning Specialist',
        'Computer Vision Expert',
        'Python Developer'
      ],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 1500,
      startDelay: 500,
      loop: true
    });
  }
  
  // Initialize particles.js
  if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: '#ffffff'
        },
        shape: {
          type: 'circle'
        },
        opacity: {
          value: 0.5,
          random: true
        },
        size: {
          value: 3,
          random: true
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#ffffff',
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'grab'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1
            }
          },
          push: {
            particles_nb: 4
          }
        }
      },
      retina_detect: true
    });
  }
  
  // Initialize skill progress bars
  function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
      const percentage = bar.getAttribute('data-percentage');
      
      // Set initial width to 0
      bar.style.width = '0';
      
      // Trigger animation when the skill bars come into view
      const skillSection = document.getElementById('skills');
      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              bar.style.width = percentage + '%';
            }, 300);
            
            // Add fadeInUp class to skill categories
            const skillCategories = document.querySelectorAll('.skill-category');
            skillCategories.forEach((category, index) => {
              setTimeout(() => {
                category.classList.add('fadeInUp');
              }, index * 200);
            });
            
            sectionObserver.unobserve(entry.target);
          }
        });
      }, {threshold: 0.3});
      
      sectionObserver.observe(skillSection);
    });
  }
  
  // Initialize project filters
  const filterItems = document.querySelectorAll('.filter-item');
  const projectItems = document.querySelectorAll('.project-item');
  
  filterItems.forEach(item => {
    item.addEventListener('click', function() {
      // Remove active class from all filter items
      filterItems.forEach(filter => {
        filter.classList.remove('active');
      });
      
      // Add active class to clicked filter item
      this.classList.add('active');
      
      // Get filter value
      const filterValue = this.getAttribute('data-filter');
      
      // Filter projects
      projectItems.forEach(project => {
        project.style.transform = 'scale(0.8)';
        project.style.opacity = '0';
        
        setTimeout(() => {
          if (filterValue === 'all' || project.getAttribute('data-category').includes(filterValue)) {
            project.style.display = 'block';
            setTimeout(() => {
              project.style.transform = 'scale(1)';
              project.style.opacity = '1';
            }, 300);
          } else {
            project.style.display = 'none';
          }
        }, 300);
      });
    });
  });
  
  // Animate timeline items
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fadeInUp');
        timelineObserver.unobserve(entry.target);
      }
    });
  }, {threshold: 0.3});
  
  timelineItems.forEach(item => {
    timelineObserver.observe(item);
  });
  
  // Animate publication items
  const publicationItems = document.querySelectorAll('.publication-item');
  const publicationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fadeInUp');
        publicationObserver.unobserve(entry.target);
      }
    });
  }, {threshold: 0.3});
  
  publicationItems.forEach(item => {
    publicationObserver.observe(item);
  });
  
  // Add fadeInUp class to project cards
  const projectCards = document.querySelectorAll('.project-card');
  const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fadeInUp');
        projectObserver.unobserve(entry.target);
      }
    });
  }, {threshold: 0.3});
  
  projectCards.forEach(card => {
    projectObserver.observe(card);
  });
  
  // Animate form elements
  const formControls = document.querySelectorAll('.form-control');
  const formObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('fadeInUp');
        }, 300);
        formObserver.unobserve(entry.target);
      }
    });
  }, {threshold: 0.3});
  
  formControls.forEach((control, index) => {
    setTimeout(() => {
      formObserver.observe(control);
    }, index * 100);
  });
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
          navbarToggler.click();
        }
      }
    });
  });
  
  // Initialize skill bars
  initSkillBars();
}); 