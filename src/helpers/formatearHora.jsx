export const formatearHora = (fecha) =>{
    const nuevaFecha = new Date(fecha);
    let  options ={
        day: 'numeric', month: 'numeric', year: 'numeric',
        
      }
      const optionsdia = { 
        
        // day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
        
     };
    
     let regreso2 =new Intl.DateTimeFormat('es-US', optionsdia).format(nuevaFecha);
    
      return regreso2
}