document.addEventListener("DOMContentLoaded", function () {
    let formulario = document.getElementById("loginform");

    formulario.addEventListener("submit", async function handleSubmit(event) {
        event.preventDefault();

        let usuario = document.getElementById("email").value.trim();
        let contraseña = document.getElementById("password").value.trim();
        let mensaje = document.getElementById("mensaje");

        let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        let regexPassword = /^(?=.*[!@#$%^&*()_+{}":;'<>,.?/~`])(?=.*[a-zA-Z]).{8,}$/;

        if (!regexEmail.test(usuario)) {
            mensaje.textContent = "❌ Ingrese un correo electrónico válido (ej: usuario@email.com)";
            mensaje.style.color = "red";
            return;
        }

        if (!regexPassword.test(contraseña)) {
            mensaje.textContent = "❌ La contraseña debe tener al menos 8 caracteres y 1 carácter especial (!@#$%^&* etc.).";
            mensaje.style.color = "red";
            return;
        }

        try {
            let response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usuario, contraseña })
            });

            let data;
            try {
                data = await response.json();
            } catch (error) {
                throw new Error("Respuesta no válida del servidor");
            }

            if (response.ok) {
                mensaje.textContent = data.mensaje;
                mensaje.style.color = "green";
                alert("Inicio de sesión exitoso");
            } else {
                mensaje.textContent = data.error;
                mensaje.style.color = "red";
            }

        } catch (error) {
            console.error("Error:", error);
            mensaje.textContent = "❌ Error al conectar con el servidor";
            mensaje.style.color = "red";
        }
    });
});
