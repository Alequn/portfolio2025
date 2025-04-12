document.addEventListener("DOMContentLoaded", () => {
    const copyBtns = document.querySelectorAll(".copy-btn");
  
    copyBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const text = btn.getAttribute("data-copy");
        navigator.clipboard.writeText(text).then(() => {
          btn.textContent = "Copiado!"; // Cambiar el texto del botón a "Copiado!"
          setTimeout(() => {
            btn.textContent = "Copiar"; // Volver al texto original
          }, 2000);
  
          // Crear la notificación
          showNotification("¡Contenido copiado!");
        });
      });
    });
  
    // Función para mostrar la notificación
    function showNotification(message) {
      // Crear un nuevo elemento de notificación
      const notification = document.createElement("div");
      notification.classList.add("notification");
      notification.textContent = message;
  
      // Agregar la notificación al contenedor
      const container = document.getElementById("notification-container");
      container.appendChild(notification);
  
      // Mostrar la notificación con animación
      setTimeout(() => {
        notification.classList.add("show");
      }, 10); // Agregar una pequeña demora para que se vea el efecto de animación
  
      // Eliminar la notificación después de 3 segundos
      setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => {
          container.removeChild(notification);
        }, 500); // Esperar a que termine la animación antes de eliminar
      }, 3000);
    }
  });
  