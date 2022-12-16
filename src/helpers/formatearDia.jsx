export const formatearDia = (fecha) =>{
    const nuevaFecha = new Date(fecha);
    let  options ={
        day: 'numeric', month: 'numeric', year: 'numeric',
        
      }
      const optionsdia = { 
        weekday: "long",
        // day: 'numeric',
        // hour: 'numeric',
        
     };
    
     let regreso2 =new Intl.DateTimeFormat('es-US', optionsdia).format(nuevaFecha);
     const regreso = nuevaFecha.getDay();
      return regreso2
}