import Swal from 'sweetalert2'

export const success = (data) => {
    return Swal.fire({
        title: data.message,
        icon: "success",
        draggable: true
});
}

export const error = (data) => {
    return Swal.fire({
        title: "Error al eliminar",
        text: data.message,
        icon: "error",
        draggable: true
});
}

export const confirm = () => {
    return Swal.fire({
        title: "Precaución",
        text: "¿Está seguro de eliminar?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí"
        })
}