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

  // Burbujas...
  const bubbleContainer = document.querySelector('.bubbles');
  const bubbleGenerationInterval = 100; // Intervalo en milisegundos para la creación de burbujas

  function createBubble() {
    const bubble = document.createElement('span');
    bubble.classList.add('bubble');

    const size = Math.random() * 30 + 10; // Variaciones de tamaño
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;

    bubble.style.left = `${Math.random() * 100}%`;

    bubble.style.animationDuration = `${8 + Math.random() * 8}s`;
    bubble.style.animationDelay = `${Math.random() * 5}s`;

    bubbleContainer.appendChild(bubble);
    
    setTimeout(() => {
      bubble.remove();
    }, 16000);
  }

  setInterval(createBubble, bubbleGenerationInterval);

  document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const bubbles = document.querySelectorAll(".bubble");
    bubbles.forEach(bubble => {
      const bubbleRect = bubble.getBoundingClientRect();
      const bubbleX = bubbleRect.left + bubbleRect.width / 2;
      const bubbleY = bubbleRect.top + bubbleRect.height / 2;

      const deltaX = mouseX - bubbleX;
      const deltaY = mouseY - bubbleY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < 150) {
        const directionX = deltaX / distance;
        const directionY = deltaY / distance;

        const moveDistance = Math.max(10 - distance / 15, 0);

        const computedLeft = parseFloat(getComputedStyle(bubble).left);
        const computedTop = parseFloat(getComputedStyle(bubble).top);

        bubble.style.left = `${computedLeft - directionX * moveDistance}px`;
        bubble.style.top = `${computedTop - directionY * moveDistance}px`;
      }
    });
  });
});
