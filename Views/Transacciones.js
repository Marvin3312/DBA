document.getElementById("transaccionForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que la página se recargue

    let cuentaOrigenP = document.getElementById("cuentaOrigenP").value;
    let cuentaDestinoP = document.getElementById("cuentaDestinoP").value;
    let montoP = document.getElementById("MontoP").value;

    // Convertir valores a números
    cuentaOrigenP = parseInt(cuentaOrigenP, 10);
    cuentaDestinoP = parseInt(cuentaDestinoP, 10);
    montoP = parseFloat(montoP);

    // Validar que sean números válidos
    if (isNaN(cuentaOrigenP) || isNaN(cuentaDestinoP) || isNaN(montoP)) {
        alert("❌ Error: Todos los campos deben ser números válidos.");
        return;
    }

    // Enviar datos al backend
    fetch("http://localhost:3000/transaccion", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            CuentaOrigenP: cuentaOrigenP,
            CuentaDestinoP: cuentaDestinoP,
            MontoP: montoP
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.mensaje) {
            alert("✅ Transacción realizada con éxito: " + data.mensaje);
        } else {
            alert("❌ Error en la transacción: " + (data.error || "Error desconocido"));
        }
    })
    .catch(error => {
        console.error("❌ Error al procesar la transacción:", error);
        alert("❌ Error al conectar con el servidor.");
    });
});
