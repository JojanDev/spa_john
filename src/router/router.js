import { routers } from "./routers";

export const router = async (elemento) => {
  const hast = location.hash.slice(2);
  const [ruta, parametros] = recorrerRutas(routers, hast);

  if (ruta.private) {
    location.hash = "#/Login";
    return;
  }

  await cargarVista(ruta.path, elemento);
  await ruta.controller(parametros);
};

const recorrerRutas = (routers, hast) => {
  //Convierte el hast a un array separado por los /, eliminando la primera posicion que es una cadena vacia
  let hash = hast.split("/");
  let parametros = {};

  if (hash.length == 3) {
    let parametrosSeparados = hash[2].split("&");

    parametrosSeparados.forEach((parametro) => {
      let claveValor = parametro.split("=");

      parametros[claveValor[0]] = claveValor[1];
      hash.pop();
    });
  }

  let rutaAtrapada = routers.inicio;

  //Recorre las claves del objeto routers
  for (const key in routers) {
    //Si la clave y el hash no coinciden se salta a la siguiente iteracion
    if (key != hash[0]) continue;

    //Codigo si coincide el hash:

    //Se recorren las propiedades
    for (const elemento in routers[key]) {
      //Si la propiedad no es un objeto, se retorna la clave de routers
      if (typeof routers[key][elemento] != "object") {
        rutaAtrapada = routers[key];
        break;
      }

      //Codigo si la propiedad es un objeto:

      //Ruta dinamica
      if (hash.length == 1 || elemento == hash[1]) {
        rutaAtrapada = routers[key][elemento];
        break;
      }
    }
    break;
  }
  //Si la ruta no es encontrada, retornamos a inicio
  return [rutaAtrapada, parametros];
};

const cargarVista = async (path, elemento) => {
  console.log(path, elemento);
  const seccion = await fetch(`./src/views/${path}`);
  if (!seccion.ok) throw new Error("No pudimos leer el archivo");
  const html = await seccion.text();
  elemento.innerHTML = html;
};
