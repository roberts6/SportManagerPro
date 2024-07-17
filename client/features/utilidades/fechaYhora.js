export const fechaYhora = () => {
    const fecha = new Date();

    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); 
    const año = fecha.getFullYear();

    const hora = String(fecha.getHours()).padStart(2, '0');
    const minutos = String(fecha.getMinutes()).padStart(2, '0');
    const segundos = String(fecha.getSeconds()).padStart(2, '0');

    const fechaFormateada = `${mes}/${dia}/${año} ${hora}:${minutos}:${segundos}`;

    return fechaFormateada;
};
