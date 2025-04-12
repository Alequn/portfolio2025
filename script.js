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
  

     // sistema de notis
    function showNotification(message) {
      const notification = document.createElement("div");
      notification.classList.add("notification");
      notification.textContent = message;
  
      const container = document.getElementById("notification-container");
      container.appendChild(notification);
  
      setTimeout(() => {
        notification.classList.add("show");
      }, 10);
  
      // Eliminar la noti despues de 3 segundos
      setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => {
          container.removeChild(notification);
        }, 500); // Esperar a que termine la animacion antes de eliminar
      }, 3000);
    }
  });
  