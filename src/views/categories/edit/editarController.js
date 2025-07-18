import { success } from "../../../helpers/alertas";
import * as api from "../../../helpers/api";
import { manejarErrores } from "../../../helpers/manejoErrores";
import * as validacion from "../../../helpers/validaciones";

export default async (parametros = null) => {
  const form = document.querySelector("#form");
  const { id } = parametros;
  // console.log(parametros);

  const resultado = await api.get(`categorias/${id}`);
  // console.log(resultado);

  if (!resultado.success) {
    manejarErrores(resultado);
    return;
  }

  const { data } = resultado;

  const nombre = document.querySelector("#nombre");
  const descripcion = document.querySelector("#descripcion");

  nombre.value = data.nombre;
  descripcion.value = data.descripcion;

  nombre.addEventListener("blur", validacion.validarCampo);
  nombre.addEventListener("keydown", (e) => {
    validacion.validarCampo(e);
    validacion.validarTexto(e);
    validacion.validarLimite(e, 20);
  });

  descripcion.addEventListener("blur", validacion.validarCampo);
  descripcion.addEventListener("keydown", (e) => {
    validacion.validarCampo(e);
    validacion.validarLimite(e, 100);
  });

  // window.addEventListener('beforeunload', (e) => {
  //   if (nombre.value != "" || descripcion.value != "") {
  //     e.preventDefault();
  //     // return "Hay datos que no se han guardado, desea continuar?"
  //   }
  // })

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (validacion.validarCampos(e)) {
      const respuesta = await api.put(`categorias/${id}`, validacion.datos);
      const data = await respuesta.json();
      if (!respuesta.ok) {
        manejarErrores(respuesta);
        return;
      }
      const alerta = await success(data);

      if (alerta.isConfirmed) window.location.href = "#/categorias";
    }
  });
};
