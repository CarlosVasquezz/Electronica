// URL de tu API
const apiUrl = 'https://670d2d70073307b4ee429947.mockapi.io/data'; // Cambia esta URL a la tuya

// Función para obtener datos de la API
async function obtenerDatos() {
    try {
        const response = await fetch(apiUrl);

        // Comprobar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error('Error al obtener datos de la API: ' + response.status);
        }

        const data = await response.json();
        // Actualizar la interfaz de usuario con los datos obtenidos
        document.getElementById('temp').innerText = data.Temperatura; // Cambiar 'temperatura' por 'temp'
        document.getElementById('distance').innerText = data.Distancia; // Cambiar 'distancia' por 'distance'
        document.getElementById('api-status').innerText = 'Estado de la API: Conectado'; // Actualizar estado a conectado
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('api-status').innerText = 'Estado de la API: Error'; // Actualizar estado a error
    }
}

// Función para enviar mensajes personalizados al Arduino
async function enviarMensaje(mensaje) {
    const response = await fetch(apiUrl, {
        method: 'PUT', // Cambia a 'PUT' o 'POST' según lo que necesites
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Mensaje: mensaje }),
    });

    if (response.ok) {
        console.log('Mensaje enviado:', mensaje);
    } else {
        console.error('Error al enviar el mensaje:', response.status);
    }
}

// Llamar a la función obtenerDatos cada 1 segundo
setInterval(obtenerDatos, 1000); // Cambiar de 2000 a 1000 para 1 segundo

// Manejo de eventos para los botones
document.getElementById('btn1').addEventListener('click', () => {
    enviarMensaje('Todas mienten');
});

document.getElementById('btn2').addEventListener('click', () => {
    enviarMensaje('Todos son iguales');
});
