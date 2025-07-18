// Esta función recibe la respuesta del servidor con errores y los muestra de forma clara
export const manejarErrores = (mensaje) => {
  // Verificamos si hay un arreglo de errores
  if (Array.isArray(mensaje.errors) && mensaje.errors.length > 0) {
    // Recorremos cada error y extraemos el mensaje correspondiente
    const errores = mensaje.errors.map(error => {
      return `❌ ${error.message}`;
    });

    // Mostramos todos los errores en un solo alert
    alert(`Errores al crear:\n${errores.join('\n')}`);

  } else alert(`❌ Error al crear: ${mensaje.message || "Error desconocido."}`);

  // Mostramos la respuesta completa en la consola
  console.warn("Respuesta del servidor con error:", mensaje);
}
