document.addEventListener("DOMContentLoaded", () => {
  const copyBtns = document.querySelectorAll(".copy-btn");

  copyBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const text = btn.getAttribute("data-copy");
      navigator.clipboard.writeText(text).then(() => {
        btn.textContent = "Copiado!";
        setTimeout(() => {
          btn.textContent = "Copiar";
        }, 2000);
        showNotification("¡Contenido copiado!");
      });
    });
  });

  const notificationSound = new Audio('sounds/noti.mp3'); //Ruta de sonido
  notificationSound.volume = 0.2; // Volumen de la noti (1 max)

  function showNotification(message) {
    const notification = document.createElement("div");
    notification.classList.add("notification");
    notification.textContent = message;

    const container = document.getElementById("notification-container");
    container.appendChild(notification);

    notificationSound.play();

    setTimeout(() => {
      notification.classList.add("show");
    }, 10);

    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        container.removeChild(notification);
      }, 500);
    }, 3000);
  }

  const hablarBtn = document.querySelector('.hero-content a');
  if (hablarBtn) {
    hablarBtn.addEventListener('click', () => {
      const slideSound = new Audio('sounds/slide.mp3'); //Ruta de sonido boton Hablemos
      slideSound.play();
    });
  }

  const navItems = document.querySelectorAll('.nav-links li');
  const clickSound = new Audio('sounds/click.mp3'); //Ruta del sonido botones navbar

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      clickSound.play();
    });
  });

  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");
  
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("mobile");
    navLinks.classList.toggle("open");
  });
  
});

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

