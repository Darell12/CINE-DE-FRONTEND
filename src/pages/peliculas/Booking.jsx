import React from "react";
import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import usePeliculas from "../../hooks/usePeliculas";
import useHorarios from "../../hooks/useHorario";

import { formatearFecha } from "../../helpers/formatearFecha";
import { formatearDia } from "../../helpers/formatearDia";
import Horarios from "./Horarios";
import Navbar from "../../components/Navbar";

export default function Modal() {
  const { auth, actualizarPerfil } = useAuth()
  const [ perfil, setPerfil] = useState({})
  const [ alerta, setAlerta] = useState({})
  const [ fecha, setFecha] = useState("12/12/2022");
  const [ timeSug, setTimeSug] = useState();
  const [busqueda, setBusqueda] = useState("");

  
  const param = useParams();

  const { obtenerPelicula, peliculaState, peliculas} = usePeliculas();
  const { obtenerHorarios, obtenerHorario, horarioState, horarios } = useHorarios();
 
  //Intento de Destructurig Array

  
  useEffect(() => {
    obtenerHorario(param.id);
    console.log(horarioState)
  }, []);

  useEffect(() => {
    obtenerPelicula(param.id);
    console.log(peliculaState)
  }, []);

  const {startAt, startDate, endDate, peliculaid} = horarios;
  const { titulo, genero, director, duracion, sinopsis, image } = peliculaState;

  useEffect( () => {
    setPerfil(auth.usuario)
    console.log(auth);
  }, [auth])


  return (
<>
<Navbar texto="Peliculas" ruta="" />
    <div className="w-full flex flex-col items-center mt-24">

<h2 class="text-4xl font-bold dark:text-white">Horarios Disponibles</h2>
    
          <div className="-mx-2 flex flex-wrap">


<div class="overflow-x-auto relative shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="py-3 px-6">
                  Fecha
                </th>
                <th scope="col" class="py-3 px-6 text-center">
                    Hora
                </th>
                <th scope="col" class="py-3 px-6 text-center">
                    Dia
                </th>
                <th scope="col" class="py-3 px-6 text-center">
                    Asientos disponibles
                </th>
                <th scope="col" class="py-3 px-6 text-center">
                    Reservar
                </th>
            </tr>
        </thead>
        <tbody>
        {horarioState.length ? (
              
              <>
              {horarioState.map((horario) => (
               <Horarios             
              horarios = {horario}
              />
              ))}
              </>       
            ): (
             <p className="mt-10 shadow-lg w-full text-center p-5 uppercase font-bold text-2xl">
               No hay Horarios Disponibles
             </p>
           )          
             }
        </tbody>
    </table>
</div>             
          </div>    
    </div>
   </>
  );
}