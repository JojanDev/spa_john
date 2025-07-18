import { confirm, error, success } from "../../helpers/alertas";
import * as api from "../../helpers/api";

const eliminar = async (e) => {
  const elemento = e.target;

  if (elemento.closest(".eliminar")) {
    const dataId = elemento.dataset.id;
    console.log(dataId);

    const confirmacion = await confirm();
    if (confirmacion.isConfirmed) {
      const fila = document.querySelector(`.tabla__fila[data-id= "${dataId}"]`);
      const resultado = await api.del(`categorias/${dataId}`);
      const respuesta = await resultado.json();

      if (!respuesta.success) {
        console.log(respuesta);
        error(respuesta);
        return;
      }

      success(respuesta);
      fila.remove();
    }
  }
};

export const categoriaController = async () => {
  const solicitud = await fetch(`http://localhost:3000/api/categorias`);
  const { data } = await solicitud.json();

  const tabla = document.querySelector("table");

  data.forEach(({ id, nombre, descripcion }) => {
    // Creamos los elementos
    const fila = document.createElement("tr");
    fila.setAttribute("data-id", id);

    const td_id = document.createElement("td");
    const td_nombre = document.createElement("td");
    const td_descripcion = document.createElement("td");
    const td_botoneria = document.createElement("td");
    // Agregamos los estilos
    fila.classList.add("tabla__fila");
    // Agregamos el nodo de texto
    td_id.textContent = id;
    td_nombre.textContent = nombre;
    td_descripcion.textContent = descripcion;

    //creacion de la botonera
    const div_botoneria = document.createElement("div");
    const boton_editar = document.createElement("a");
    const boton_eliminar = document.createElement("button");
    //Agregamos los estilos
    div_botoneria.classList.add("d-flex", "gap-8", "justicado-centrado");
    boton_editar.classList.add("boton");
    boton_eliminar.classList.add("boton", "boton--rojo", "eliminar");
    boton_eliminar.setAttribute("data-id", id);

    //Agregamos el contenido de texto
    boton_editar.textContent = "Editar";
    boton_eliminar.textContent = "Eliminar";

    boton_editar.href = `#/categorias/editar/id=${id}`;

    div_botoneria.append(boton_editar, boton_eliminar);
    td_botoneria.append(div_botoneria);
    // Agregamos las columnas a la fila
    fila.append(td_id, td_nombre, td_descripcion, td_botoneria);
    tabla.append(fila);
  });
};

document.addEventListener("click", eliminar);
