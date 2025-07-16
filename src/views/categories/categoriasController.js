export const categoriaController = async () => {
    
    const solicitud = await fetch(`http://localhost:3000/api/categorias`);
    const {data} =  await solicitud.json()

    const tabla = document.querySelector('table');
    
    data.forEach( ({id, nombre, descripcion}) => {
        // Creamos los elementos
        const fila = document.createElement('tr');
        const td_id = document.createElement('td');
        const td_nombre = document.createElement('td');
        const td_descripcion = document.createElement('td');
        const td_botoneria = document.createElement('td');
        // Agregamos los estilos
        fila.classList.add('tabla__fila');
        // Agregamos el nodo de texto
        td_id.textContent = id;
        td_nombre.textContent = nombre;
        td_descripcion.textContent = descripcion;

        //creacion de la botonera
        const div_botoneria = document.createElement('div');
        const boton_editar = document.createElement('a');
        const boton_eliminar = document.createElement('button');
        //Agregamos los estilos
        div_botoneria.classList.add('d-flex','gap-8','justicado-centrado');
        boton_editar.classList.add('boton');
        boton_eliminar.classList.add('boton','boton--rojo')
        //Agregamos el contenido de texto
        boton_editar.textContent = "Editar";
        boton_editar.setAttribute('href',`editar/${id}`);
        boton_eliminar.textContent = "Eliminar";
        div_botoneria.append(boton_editar,boton_eliminar);
        td_botoneria.append(div_botoneria);
        // Agregamos las columnas a la fila
        fila.append(td_id, td_nombre, td_descripcion,td_botoneria);
        tabla.append(fila);
    });
};