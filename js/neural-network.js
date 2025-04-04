// 3D Neural Network Animation with Three.js
document.addEventListener('DOMContentLoaded', function() {
  // Check if animation container exists
  const aiAnimation = document.querySelector('.ai-animation');
  if (!aiAnimation) return;
  
  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, aiAnimation.clientWidth / aiAnimation.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  
  renderer.setSize(aiAnimation.clientWidth, aiAnimation.clientHeight);
  renderer.setClearColor(0x000000, 0);
  aiAnimation.appendChild(renderer.domElement);
  
  // Camera position
  camera.position.z = 5;
  
  // Create particles for neural network nodes
  const nodeGeometry = new THREE.SphereGeometry(0.1, 16, 16);
  const nodeMaterial = new THREE.MeshBasicMaterial({
    color: 0x4F46E5,
    transparent: true,
    opacity: 0.7
  });
  
  // Create lines for connections
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x4F46E5,
    transparent: true,
    opacity: 0.3
  });
  
  // Create particle system
  const particles = new THREE.Group();
  const connections = new THREE.Group();
  scene.add(particles);
  scene.add(connections);
  
  // Create nodes
  const nodes = [];
  const numNodes = 30;
  
  for (let i = 0; i < numNodes; i++) {
    const node = new THREE.Mesh(nodeGeometry, nodeMaterial.clone());
    // Random position
    node.position.x = (Math.random() - 0.5) * 7;
    node.position.y = (Math.random() - 0.5) * 7;
    node.position.z = (Math.random() - 0.5) * 7;
    
    // Store velocity for animation
    node.userData = {
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01
      ),
      // Original color for pulsing effect
      originalColor: new THREE.Color(0x4F46E5),
      // Random phase for the color pulsation
      phase: Math.random() * Math.PI * 2
    };
    
    particles.add(node);
    nodes.push(node);
  }
  
  // Function to create connections based on distance
  function createConnections() {
    // Remove old connections
    while (connections.children.length > 0) {
      connections.remove(connections.children[0]);
    }
    
    // Create new connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = nodes[i].position.distanceTo(nodes[j].position);
        
        if (distance < 2.5) {
          const opacity = 1 - (distance / 2.5); // Fade with distance
          
          const geometry = new THREE.BufferGeometry().setFromPoints([
            nodes[i].position,
            nodes[j].position
          ]);
          
          const line = new THREE.Line(geometry, lineMaterial.clone());
          line.material.opacity = opacity * 0.3;
          connections.add(line);
        }
      }
    }
  }
  
  // Add light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  const pointLight = new THREE.PointLight(0x4F46E5, 1);
  pointLight.position.set(0, 0, 4);
  scene.add(pointLight);
  
  // Mouse interaction
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  
  function onMouseMove(event) {
    // Calculate mouse position in normalized device coordinates
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }
  
  window.addEventListener('mousemove', onMouseMove);
  
  // Animation
  function animate() {
    requestAnimationFrame(animate);
    
    // Update node positions
    const time = Date.now() * 0.001; // Current time in seconds
    
    nodes.forEach(node => {
      // Move nodes
      node.position.add(node.userData.velocity);
      
      // Bounce off invisible boundaries
      if (Math.abs(node.position.x) > 3.5) {
        node.userData.velocity.x *= -1;
      }
      if (Math.abs(node.position.y) > 3.5) {
        node.userData.velocity.y *= -1;
      }
      if (Math.abs(node.position.z) > 3.5) {
        node.userData.velocity.z *= -1;
      }
      
      // Color pulsation effect
      const pulseColor = node.userData.originalColor.clone();
      const pulseFactor = 0.3 * Math.sin(time * 2 + node.userData.phase) + 0.7;
      pulseColor.multiplyScalar(pulseFactor);
      node.material.color = pulseColor;
      
      // Node size pulsation
      const scaleFactor = 0.2 * Math.sin(time * 2 + node.userData.phase) + 1;
      node.scale.set(scaleFactor, scaleFactor, scaleFactor);
    });
    
    // Recreate connections
    if (Math.random() < 0.03) { // Only occasionally update connections for performance
      createConnections();
    }
    
    // Rotate the entire neural network
    particles.rotation.y += 0.003;
    connections.rotation.y += 0.003;
    
    // Interactive mouse effect
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(particles.children);
    
    if (intersects.length > 0) {
      const intersect = intersects[0];
      // Highlight the node
      intersect.object.material.color.set(0x00ffff);
      // Make it larger
      intersect.object.scale.set(2, 2, 2);
    }
    
    renderer.render(scene, camera);
  }
  
  // Handle window resize
  function handleResize() {
    camera.aspect = aiAnimation.clientWidth / aiAnimation.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(aiAnimation.clientWidth, aiAnimation.clientHeight);
  }
  
  window.addEventListener('resize', handleResize);
  
  // Initial connections
  createConnections();
  
  // Start animation
  animate();
}); 