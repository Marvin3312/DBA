document.addEventListener("DOMContentLoaded", function () {
    let formulario = document.getElementById("loginform");

    formulario.addEventListener("submit", function handleSubmit(event) {
        event.preventDefault(); // Evita que la página se recargue

        let usuario = document.getElementById("email").value.trim();
        let contraseña = document.getElementById("password").value.trim();
        let mensaje = document.getElementById("mensaje");

        // Expresión regular para validar correo electrónico
        let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!regexEmail.test(usuario)) {
            mensaje.textContent = "❌ Ingrese un correo electrónico válido (ej: usuario@email.com)";
            mensaje.style.color = "red";
            return;
        }

        // Expresión regular para validar la contraseña (mínimo 8 caracteres, al menos 1 especial)
        let regexPassword = /^(?=.*[!@#$%^&*()_+{}":;'<>,.?/~`])(?=.*[a-zA-Z]).{8,}$/;

        if (!regexPassword.test(contraseña)) {
            mensaje.textContent = "❌ La contraseña debe tener al menos 8 caracteres y 1 carácter especial (!@#$%^&* etc.).";
            mensaje.style.color = "red";
            return;
        }

        // Usuario y contraseña predefinidos (simulación de autenticación)
        let usuarioCorrecto = "admin@gmail.com";
        let contraseñaCorrecta = "Admin@123"; // Ahora cumple con la validación

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
