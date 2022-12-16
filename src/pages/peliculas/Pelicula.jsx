import {NavLink, useNavigate} from 'react-router-dom';
// import useReservacion from '../../hooks/useReserva';
import { formatearCantidad } from '../../helpers/formatearCantidad';


const Pelicula = ({pelicula}) => {
    const {_id, titulo, duracion, genero, image, sinopsis} = pelicula;
    const navigate = useNavigate();
    
    
  return (
    <div className="flex flex-col h-1/2 border rounded-lg w-60 bg-white hover:scale-105 overflow-hidden">

    
<div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
<NavLink to={`detalle-pelicula/${_id}`}>  
        <img class="rounded-t-lg" src={image.url} alt={titulo} />
</NavLink>

    <div class="p-5">
      <NavLink
      id={_id}
      to={`detalle-pelicula/${_id}`}>       
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{titulo}</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{sinopsis}</p>
        </NavLink>
        
    <NavLink
    id={_id}
    to={`Booking/${_id}`}>
        <a class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Reservar
            <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </a>
    </NavLink>
    </div>
  </div>
</div>
  )
}

export default Pelicula