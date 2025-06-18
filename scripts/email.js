ocument.addEventListener("DOMContentLoaded", () => {

  const emailForm = document.getElementById("emailForm");

  emailForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const templateParams = {
      user_name: emailForm.user_name.value,
      user_email: emailForm.user_email.value,
      title: emailForm.title.value,
      message: emailForm.message.value,
      to_email: "alexbentancur132@gmail.com"
    };

    emailjs.send('service_yxg6gie', 'template_wih2ono', templateParams)
      .then(() => {
        emailForm.reset();
        showNotification("¡Email enviado correctamente!");
      })
      .catch((error) => {
        console.error(error);
        showNotification("Error al enviar el email, intenta nuevamente.");
      });
  });

});