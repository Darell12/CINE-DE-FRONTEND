import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { formatearDia } from '../../helpers/formatearDia';
import { formatearFecha } from '../../helpers/formatearFecha'
import { formatearFechaReserva } from "../../helpers/formatearFechaReserva";
import { formatearHora } from '../../helpers/formatearHora';

import useAuth from "../../hooks/useAuth";
import usePeliculas from "../../hooks/usePeliculas";

import FormReserva from "./FormReserva";

const Horarios = ({horarios})  => {
    const [ seleccion, setSeleccion] = useState();
    const { auth, actualizarPerfil } = useAuth()
    const [ perfil, setPerfil] = useState({})
    
    useEffect( () => {
        setPerfil(auth.usuario)
        console.log(auth);
      }, [auth])

    
 const {_id, startAt, startDate, endDate, peliculaid} = horarios;
 
 const onClickSave = (e) => {
        setSeleccion( e.target.value);
        localStorage.setItem('idHorario', _id)
        console.log(seleccion)
        localStorage.setItem('fechares',  formatearFechaReserva(startDate))
       
        
    }
  return (
    <>
    {horarios.length ? (
        <>
    <p className="mt-10 shadow-lg w-full text-center p-5 uppercase font-bold text-2xl"> No hay Horarios disponibles</p>
        </>
        
      ) : (
        <>
            <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                name={formatearFecha(startDate)}>
                   {formatearFecha(startDate)}
                </th>
                <td class="py-4 px-6">
                    {formatearHora(startDate)}
                </td>
                <td class="py-4 px-6">
                    {formatearDia(startDate)}
                </td>
                <td class="py-4 px-6 text-center">
                    14
                </td>
                <td class="py-4 px-6">
                <NavLink
                to={`form-reserva/${peliculaid}`}
                ><button 
                type="button" 
                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                onClick={onClickSave}
                value={formatearFechaReserva(startDate)}

        >Reservar</button> 
        </NavLink>
                </td>
            </tr> 



        </>
        
      )
      
      }
      </>
  )
}

export default Horarios





// {horarios.length ? (
//     <>

//     {horarios.map((horario) => (
        
// formatearDia(startDate) ==  formatearDia(fecha) ? 
// <option value={
// formatearFecha(startDate)
//   }
//  >
//    </option>
// : 
// <>

// </>


      
         
//     ))}
//     </>
    
//   ) : (
//     <p className="mt-10 shadow-lg w-full text-center p-5 uppercase font-bold text-2xl"> No hay Horarios disponibles</p>
//   )
  
//   }