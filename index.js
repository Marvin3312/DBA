document.addEventListener("DOMContentLoaded", function () {
    let formulario = document.getElementById("loginForm");

    formulario.addEventListener("submit", function handleSubmit (event) {
        event.preventDefault();  // Evita que la página se recargue

        let usuario = document.getElementById("email").value;
        let contraseña = document.getElementById("password").value;
        let mensaje = document.getElementById("mensaje");

          // Expresión regular para validar correo electrónico
          let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

          if (!regexEmail.test(email)) {
              mensaje.textContent = "❌ Ingrese un correo electrónico válido (ej: usuario@email.com)";
              mensaje.style.color = "red";
              return;
          }

        // Expresión regular para validar la contraseña
        let regexPassword = /^(?=.*[!@#$%^&*()_+{}":;'<>,.?/~`])(?=.*[a-zA-Z]).{8,}$/;

        if (contraseña.length < 8) {
            mensaje.textContent = "❌ La contraseña debe tener al menos 8 caracteres.";
            mensaje.style.color = "red";
            return;
        }

        if (!regexPassword.test(contraseña)) {
            mensaje.textContent = "❌ La contraseña debe contener al menos 1 carácter especial (!@#$%^&* etc.).";
            mensaje.style.color = "red";
            return;
        }
        // Usuario y contraseña predefinidos (simulación de autenticación)
        let usuarioCorrecto = "admin@gmail.com";
        let contraseñaCorrecta = "12345678";

        if (usuario === usuarioCorrecto && contraseña === contraseñaCorrecta) {
            mensaje.textContent = "✅ Inicio de sesión exitoso";
            mensaje.style.color = "green";
            alert("Inicio de sesión exitoso");
        } else {
            mensaje.textContent = "❌ Usuario o contraseña incorrectos";
            mensaje.style.color = "red";
        }
    });
});
