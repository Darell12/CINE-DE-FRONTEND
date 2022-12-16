import {useEffect} from 'react'

import usePeliculas from '../../hooks/usePeliculas'
import Pelicula from "./Pelicula";

import Navbar from '../../components/Navbar';


const ListaPeliculas = () => {
    const { peliculas } = usePeliculas();
    
  return (
    <>
    <Navbar texto="Agregar Pelicula" ruta="agregar-pelicula" />




    <div className="w-full justify-center h-5/6 max-sm:p-0 md:px-20 lg:px-40">
        <div className="w-full flex flex-col items-center mt-24">
          <h1 className="font-bold text-5xl uppercase text-center w-full mx-auto mb-10">
            <span className="text-sky-700">Peliculas</span> a reservar
          </h1>

          <div className="flex mx-4 gap-5 mb-10 flex-wrap justify-center">
            
            {peliculas.length ? (
              <>
                {peliculas.map((pelicula) => (
                  <Pelicula 
                    key={pelicula._id} 
                    pelicula={pelicula} />
                ))}
              </>
            ) : (
              <p className="mt-10 shadow-lg w-full text-center p-5 uppercase font-bold text-2xl">
                No hay Peliculas
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ListaPeliculas