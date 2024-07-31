export function calcularCategoria(fecha_nacimiento) {
    
    const fecha = new Date(fecha_nacimiento);
    const anio = fecha.getFullYear();

    if (anio <= 2002) {
        return 'Mayor';
    } else if (anio >= 2003 && anio <= 2005) {
        return 'Junior';
    } else if (anio >= 2006 && anio <= 2007) {
        return 'Juvenil';
    } else if (anio >= 2008 && anio <= 2009) {
        return 'Cadete';
    } else if (anio >= 2010 && anio <= 2011) {
        return 'Menor';
    } else if (anio >= 2012 && anio <= 2013) {
        return 'Infantil';
    } else {
        return 'Mini';
    }
}
