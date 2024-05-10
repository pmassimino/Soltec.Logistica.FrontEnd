export const formatearHora = (fechaString: string) => {
    const fecha = new Date(fechaString); // Convertir la cadena a un objeto Date
    if (isNaN(fecha.getTime())) {
      return "Hora inválida";
    }
    const hora = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    return `(${hora}:${minutos})`;
  };
  
  // Función para formatear la fecha en "dd-mm-yyyy"
  export const formatearFecha = (fechaString: string) => {
    const fecha = new Date(fechaString);
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const año = fecha.getFullYear();
    return `${dia}-${mes}-${año}`;
  };