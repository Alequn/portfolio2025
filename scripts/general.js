document.addEventListener("DOMContentLoaded", () => {

  const hablemosButton = document.querySelectorAll('.hero-content a');
  const navItems = document.querySelectorAll('.nav-links li');
  const formButtons = document.querySelectorAll('form button');
  const contactButtons = document.querySelectorAll('.redes-contacto a');

  const clickSound = new Audio('sounds/click.mp3');
  const slideSound = new Audio('sounds/slide.mp3');

  const buttonSoundClick = [...navItems, ...formButtons, ...contactButtons,];
  const buttonSoundSlide = [...hablemosButton];

  if (buttonSoundClick) {

    buttonSoundClick.forEach(item => {
      item.addEventListener('click', () => {
        clickSound.play();
      });

    });
  }
  
  if (buttonSoundSlide) {

    buttonSoundSlide.forEach(item => {
      item.addEventListener('click', () =>{
        slideSound.play();
      })
    })
    
  }

  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");
  
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("mobile");
    navLinks.classList.toggle("open");
  });
  

  const contactNotis = document.querySelectorAll('.redes-contacto a');

contactNotis.forEach(item => {

  item.addEventListener('click', () => {
    if (item.classList.contains('cv')) {

      showNotification("¡CV descargado!");

    } else if (item.classList.contains('email')) {
        
      const email = "alexbentancur132@gmail.com";
      navigator.clipboard.writeText(email)
      showNotification("¡Email copiado!");

    }
  });
});
});
