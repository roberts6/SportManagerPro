export const calcularEdad = (fecha_nacimiento) => {
    const hoy = new Date();
    const fechaNac = new Date(fecha_nacimiento);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const diferenciaMeses = hoy.getMonth() - fechaNac.getMonth();
    if (
        diferenciaMeses < 0 ||
        (diferenciaMeses === 0 && hoy.getDate() < fechaNac.getDate())
    ) {
        edad--;
    }
    //console.log("esta es la edad calculada ",edad)
    return edad;
};
