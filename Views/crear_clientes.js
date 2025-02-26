// Crear un cliente al enviar el formulario
document.getElementById('crearClienteForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Evita que se recargue la página

    document.getElementById('crearClienteForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const dpi = document.getElementById('DPI1').value.trim();

    // Validar que el DPI tenga exactamente 13 dígitos numéricos
    if (!/^\d{13}$/.test(dpi)) {
        alert("El DPI debe contener exactamente 13 números.");
        return;
    }
    
        const data = {
            Nombre1: document.getElementById('Nombre1').value,
            Apellido1: document.getElementById('Apellido1').value,
            DPI1: document.getElementById('DPI1').value.toString(), // Convertir a string
            Direccion1: document.getElementById('Direccion1').value,
            Telefono1: document.getElementById('Telefono1').value,
            Nacimiento1: document.getElementById('Nacimiento1').value,
            Usuario1: document.getElementById('Usuario1').value,
            Contrasena1: document.getElementById('Contrasena1').value,
            Moneda1: document.getElementById('Moneda1').value,
            Tipo1: parseInt(document.getElementById('Tipo1').value) // Asegurar que Tipo1 sea número
        };
        console.log("Datos enviados al servidor:", data);

        try {
            const response = await fetch('http://localhost:3000/api/clientes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
    
            const result = await response.json();
            console.log(result);
    
            if (response.ok) {
                alert('Cliente creado con éxito');
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Error al crear cliente:', error);
        }
    });
    
    // Obtener datos del formulario
    const formData = new FormData(event.target);
    const cliente = {};
    formData.forEach((value, key) => {
        cliente[key] = value;
    });

    try {
        const response = await fetch('http://localhost:3000/crear_cliente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cliente),
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.mensaje); // Muestra un mensaje de éxito
            // Puedes limpiar el formulario si lo deseas
            event.target.reset();
        } else {
            const error = await response.json();
            alert(`Error: ${error.error}`); // Muestra un mensaje de error
        }
    } catch (error) {
        alert('Error al crear el cliente: ' + error.message);
    }
});
document.getElementById('regresarBtn').addEventListener('click', function() {
    window.location.href = '../index.html'; // Ajusta la ruta según sea necesario
});
