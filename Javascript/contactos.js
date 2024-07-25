// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Obtener el formulario de contacto por su ID
    const contactForm = document.getElementById('contactForm');

    // Agregar un evento de escucha para el envío del formulario
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        // Obtener los valores de los campos del formulario
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const mensaje = document.getElementById('mensaje').value;

        // Crear un objeto FormData con los datos del formulario
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('email', email);
        formData.append('mensaje', mensaje);

        // Enviar los datos del formulario al servidor usando Fetch API
        fetch('procesar_contacto.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json()) // Convertir la respuesta a JSON
        .then(data => {
            // Manejar la respuesta del servidor
            if (data.success) {
                // Mostrar un mensaje de éxito usando SweetAlert u otro método
                mostrarMensaje('Mensaje recibido con éxito. Te contactaremos pronto.', 'success');
                // Cerrar el modal de contacto
                $('#contactoModal').modal('hide');
                // Limpiar el formulario después de enviar
                contactForm.reset();
            } else {
                // Mostrar un mensaje de error si el envío falló
                mostrarMensaje('Hubo un error al enviar el mensaje. Por favor, inténtalo nuevamente.', 'error');
            }
        })
        .catch(error => {
            console.error('Error al enviar formulario:', error);
            mostrarMensaje('Hubo un error al enviar el mensaje. Por favor, inténtalo nuevamente.', 'error');
        });
    });

    // Función para mostrar mensajes usando SweetAlert
    function mostrarMensaje(mensaje, tipo) {
        swal({
            title: tipo === 'success' ? '¡Éxito!' : '¡Error!',
            text: mensaje,
            icon: tipo,
            button: 'OK'
        });
    }
});
