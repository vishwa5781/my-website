// Interactive Mouse Cursor Effect
document.addEventListener('DOMContentLoaded', function() {
  // Create cursor elements if they don't exist
  if (!document.querySelector('.cursor')) {
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);
  }
  
  if (!document.querySelector('.cursor-follower')) {
    const cursorFollower = document.createElement('div');
    cursorFollower.classList.add('cursor-follower');
    document.body.appendChild(cursorFollower);
  }
  
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');
  
  // Variables for cursor movement
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let followerX = 0;
  let followerY = 0;
  let speed = 0.1;
  
  // Hide cursor when mouse leaves window
  document.addEventListener('mouseleave', function() {
    cursor.classList.add('hidden');
    cursorFollower.classList.add('hidden');
  });
  
  // Show cursor when mouse enters window
  document.addEventListener('mouseenter', function() {
    cursor.classList.remove('hidden');
    cursorFollower.classList.remove('hidden');
  });
  
  // Track mouse position
  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Make cursor visible immediately on mousemove
    cursor.classList.remove('hidden');
    cursorFollower.classList.remove('hidden');
  });
  
  // Activate effect on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-category, .social-icon, .btn, input, textarea, .filter-item');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', function() {
      cursor.classList.add('active');
      cursorFollower.classList.add('active');
    });
    
    el.addEventListener('mouseleave', function() {
      cursor.classList.remove('active');
      cursorFollower.classList.remove('active');
    });
  });
  
  // Magnetic effect for buttons and other elements
  const magneticElements = document.querySelectorAll('.btn, .social-icon, .project-btn');
  
  magneticElements.forEach(el => {
    el.addEventListener('mousemove', function(e) {
      // Get element dimensions and position
      const rect = this.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance between mouse and center of element
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      
      // Apply magnetic effect (move element slightly toward cursor)
      if (window.innerWidth > 768) {
        this.style.transform = `translate(${distanceX/6}px, ${distanceY/6}px)`;
      }
    });
    
    el.addEventListener('mouseleave', function() {
      // Reset position when mouse leaves
      this.style.transform = 'translate(0, 0)';
    });
  });
  
  // Animation function that smoothly follows the mouse
  function animateCursor() {
    // Calculate new position with easing
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;
    
    followerX += (mouseX - followerX) * (speed * 0.5);
    followerY += (mouseY - followerY) * (speed * 0.5);
    
    // Apply new position
    if (cursor) {
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
    }
    
    if (cursorFollower) {
      cursorFollower.style.left = followerX + 'px';
      cursorFollower.style.top = followerY + 'px';
    }
    
    // Continue animation loop
    requestAnimationFrame(animateCursor);
  }
  
  // Start animation
  animateCursor();
}); 