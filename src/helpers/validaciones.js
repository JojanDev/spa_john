// Teclas espeiales
const teclasEspeciales = ["Backspace", "Tab", "Enter", "ArrowLeft", "ArrowRight", "Delete", "Home", "End"]; // Teclas especiales que se permiten

// Validación para los campos de texto con límite de caracteres
export const validarLimite = (event, limite) => {
  const key = event.key;
  if (!teclasEspeciales.includes(key) && event.target.value.length >= limite) event.preventDefault(); // Evitamos la acción de la tecla si el campo supera el límite    
};

// Validación para los campos de texto
export const validarTexto = (event) => {
  const key = event.key; // Obtenemos la tecla presionada
  const regex = /^[\D]*$/i; // Expresión regular para letras y caracteres especiales

  // Validamos si la tecla no es una letra
  if ((!regex.test(key)) &&
    !teclasEspeciales.includes(key)) {

    event.preventDefault(); // Evitamos la acción de la tecla
  }
  validarCampo(event); // Validamos el campo para agregar o quitar el error
};

// Validación para los campos de número
export const validarNumero = (event) => {
  const key = event.key; // Obtenemos la tecla presionada
  const regex = /^[\d]*$/; // Expresión regular para números

  // Validamos si la tecla no es un número
  if (!regex.test(key) && !teclasEspeciales.includes(key))
    event.preventDefault(); // Evitamos la acción de la tecla

  validarCampo(event); // Validamos el campo para agregar o quitar el error
};

// Validación para la contraseña
export const validarContrasena = (contrasena) => {
  let regexContra = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/; // Expresión regular para validar la contraseña

  // Validamos si la contraseña es válida
  if (contrasena.value.trim() != "" && !regexContra.test(contrasena.value)) {
    let error = "";

    if (!/[A-Z]/.test(contrasena.value)) // Validamos si la contraseña contiene al menos una mayúscula
      error = "Una mayúscula.";

    if (!/[a-z]/.test(contrasena.value)) // Validamos si la contraseña contiene al menos una minúscula
      error = "Una minúscula.";

    if (!/\d/.test(contrasena.value)) // Validamos si la contraseña contiene al menos un número
      error = "Un número.";

    if (!/\W/.test(contrasena.value)) // Validamos si la contraseña contiene al menos un carácter especial
      error = "Un carácter especial.";

    if (contrasena.value.length < 8)  // Validamos si la contraseña tiene al menos 8 caracteres
      error = "Al menos 8 caracteres.";

    agregarError(contrasena.parentElement, "Requisitos: " + error); // Agregamos el error
    return false; // Si la contraseña es inválida, el formulario no es válido
  }
  return true;
}

// Validación para el correo electrónico
export const validarCorreo = (correo) => {
  let regexCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Expresión regular para validar el correo electrónico
  // Validamos si el correo es válido
  if (correo.value.trim() != "" && !regexCorreo.test(correo.value)) {
    agregarError(correo.parentElement, "El correo electrónico no es válido."); // Agregamos el error
    return false; // Si el correo es inválido, el formulario no es válido
  }
  return true;
}
// --------------------------------------------------------

// Validación para los campos de texto y las listas desplegables
// Retorna true o false dependiendo de si el campo es válido o no
export const validarCampo = (event) => {

  let campo = event.target; // Obtenemos el campo que disparó el evento

  if (((campo.tagName == "INPUT" || campo.tagName == "TEXTAREA") && campo.value.trim() == "") || // Validamos si el campo es un input o un textarea y está vacío
    (campo.tagName == "SELECT" && campo.selectedIndex == 0) // Validamos si el campo es un select y no se ha seleccionado una opción
  ) {
    agregarError(campo.parentElement); // Agregamos el error
    return false;
  }

  if (campo.parentElement.className.includes('error'))
    quitarError(campo.parentElement); // Quitamos el error

  return true;
};

// --------------------------------------------------------
// Funciones para agregar y quitar errores

// Agrega un borde rojo y un mensaje de advertencia al campo
const agregarError = (campo, mensaje = "El campo es obligatorio.") => {
  campo.classList.add('error');
  campo.style.setProperty('--error-content', `"${mensaje}"`);
};


// Quita el borde rojo y el mensaje de advertencia del campo
const quitarError = (campo) => {
  campo.classList.remove('error');
};

// --------------------------------------------------------
// Función para validar todos los campos del formulario

export const datos = {}; // Objeto para almacenar los datos del formulario
export const validarCampos = (event) => {

  let valido = true; // Variable para validar si el formulario es válido

  // Obtenemos todos los campos del formulario que tienen el atributo required y son de tipo input o select
  const campos = [...event.target].filter((elemento) => elemento.hasAttribute("required") && (elemento.tagName == "INPUT" || elemento.tagName == "SELECT" || elemento.tagName == "TEXTAREA"));

  // Recorremos los campos y validamos cada uno de ellos
  campos.forEach((campo) => {
    if (!validarCampo({ target: campo })) valido = false;

    datos[campo.getAttribute("name")] = campo.value;
  });

  // Validación para la contraseña
  // Obtenemos el campo de la contraseña
  const contrasena = campos.find((campo) => campo.name == 'contrasena');
  if (contrasena && !validarContrasena(contrasena)) valido = false; // Si la contraseña es inválida, el formulario no es válido

  // Validación para el correo electrónico
  // Obtenemos el campo del correo electrónico
  const correo = campos.find((campo) => campo.name == 'correo');
  if (correo && !validarCorreo(correo)) valido = false; // Si el correo es inválido, el formulario no es válido

  return valido; // Retornamos si el formulario es válido o no
};