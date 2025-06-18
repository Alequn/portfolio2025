const notificationSound = new Audio('sounds/noti.mp3');
notificationSound.volume = 0.2;

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