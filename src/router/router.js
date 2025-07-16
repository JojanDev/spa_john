import { routers } from "./routers";

export const router = (elemento) => {
  const hast = location.hash.slice(1);
  const ruta = recorrerRutas(routers, hast);
  cargarVista(ruta.path, elemento);
  // ruta.controller();
};

const recorrerRutas = (routers, hast) => {
  // console.log(hast);
  // console.log(hast.split("/").length);
  for (const key in routers) {
    let hash = hast.split("/");

    //Si la clave y el hash no coinciden se salta a la siguiente iteracion
    if (key != hash[1]) continue;

    //Codigo si coincide el hash:

    //Se recorren las propiedades
    for (const elemento in routers[key]) {
      //Si la propiedad no es un objeto, se retorna la clave de routers
      if (typeof routers[key][elemento] != "object") return routers[key];

      //Codigo si la propiedad es un objeto:

      //Listar (hash = Array del hash separado por /, si tiene 2 posiciones es listar)
      if (hash.length == 2) return routers[key][elemento];

      //Resto del crud dinamico, hash[2] contiene la cadena de la accion ["",categorias, crear] (crear == crear)
      if (elemento == hash[2]) return routers[key][elemento];
    }
  }
  return "";
};

const cargarVista = async (path, elemento) => {
  console.log(path, elemento);
  const seccion = await fetch(`./src/views/${path}`);
  if (!seccion.ok) throw new Error("No pudimos leer el archivo");
  const html = await seccion.text();
  elemento.innerHTML = html;
};
