document.addEventListener("DOMContentLoaded", () => {

const canvas = document.getElementById('bubble-canvas');
const ctx = canvas.getContext('2d');

let bubbles = [];
const bubbleCount = 150;
const maxRadius = 15;
let mouse = { x: null, y: null };

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Crear burbujas
for (let i = 0; i < bubbleCount; i++) {
  bubbles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * maxRadius + 2,
    dx: (Math.random() - 0.5) * 0.8,
    dy: (Math.random() - 0.5) * 0.8,
  });
}

window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
window.addEventListener('mouseleave', () => {
  mouse.x = null;
  mouse.y = null;
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let b of bubbles) {
    // Movimiento normal
    b.x += b.dx;
    b.y += b.dy;

    // Rebote con bordes
    if (b.x < 0 || b.x > canvas.width) b.dx *= -1;
    if (b.y < 0 || b.y > canvas.height) b.dy *= -1;

    // Interacción con el mouse
    if (mouse.x !== null && mouse.y !== null) {
      const dx = b.x - mouse.x;
      const dy = b.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const influenceRadius = 100;

      if (dist < influenceRadius) {
        const angle = Math.atan2(dy, dx);
        const force = (influenceRadius - dist) / influenceRadius;
        b.x += Math.cos(angle) * force * 5;
        b.y += Math.sin(angle) * force * 5;
      }
    }

    // Dibujar burbuja
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.fill();
  }

  requestAnimationFrame(animate);
}

animate();

});