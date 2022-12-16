import { useEffect, useState } from "react";
import { useParams, Navigate, NavLink } from "react-router-dom";
import Swal from 'sweetalert2';

import usePeliculas from "../../hooks/usePeliculas";
import useComentarios from "../../hooks/useComentarios";

import Navbar from "../../components/Navbar";
import EditarPeliculas from "./EditarPelicula";
import Comentarios from "./Comentarios";

const DetallePelicula = () => {
  const param = useParams();
  const [modalEditar, setModalEditar] = useState(false);

  const { obtenerPelicula, peliculaState, deletePelicula, eliminado, setEliminado } = usePeliculas();
  const {obtenerComentarios, obtenerComentariosPeli, comentariosState} = useComentarios();

  useEffect(() => {
    obtenerPelicula(param.id);
  }, []);

  
  useEffect(() => {
     obtenerComentariosPeli(param.id);
   }, []);



  const handelClick = async (e) => {
    e.preventDefault();

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn bg-red-600 rounded-md text-white text-center p-2 font-bold mx-2',
            cancelButton: 'btn bg-green-600 rounded-md text-white text-center p-2 font-bold mx-2'
        },
        buttonsStyling: false
        })
        
        swalWithBootstrapButtons.fire({
            title: 'Estas seguro?',
            text: "Estas accion no se podra revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar!',
            reverseButtons: true
        }).then((result) => {
        if (result.isConfirmed) {

          deletePelicula(param.id);

          swalWithBootstrapButtons.fire(
              'Eliminado!',
              'El Producto se elimino',
              'success'
          )
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
            'Cancelado',
            'No se elimino la Pelicula!!',
            'error'
            )
        }
        })
  };

  const { titulo, genero, director, duracion, sinopsis, image } = peliculaState;
  //console.log(image);
  return (
    <>
      <Navbar texto="Peliculas" ruta="" />
      <div
        className={`${
          modalEditar ? "h-0" : "h-5/6"
        } w-5/6 mb-4 min-sm:h-screen mx-auto overflow-hidden`}
      >
         {eliminado && <Navigate to="/peliculas"/>}
        <h1 className="font-bold text-6xl uppercase text-center w-full mx-auto mb-4 break-words	mt-24">
          Información de la <span className="text-sky-700">pelicula</span>
        </h1>

        



        <div className="w-full px-10 py-2 md:px-20 md:py-5 lg:px-40 lg:py-10 border-2 shadow-lg mt-5">
          <div className="mb-9 flex justify-center">
            <img
              src={image ? `${image.url}` : ""}
              alt={titulo}
              className="h-56 w-96 border-2"
            />
          </div>
          <h1 className="text-4xl font-bold capitalize mb-9">{titulo}</h1>
          <p className="text-xl mb-9">{sinopsis}</p>
          <div className="flex justify-around mb-3">
            <p className="text-xl font-semibold">
              Duracion : <span className="font-normal">{duracion}</span>
            </p>
            <p className="text-xl font-semibold">
              Genero : <span className="font-normal">{genero}</span>
            </p>
            <p className="text-xl font-semibold">
              Director : <span className="font-normal">{director}</span>
            </p>
          </div>

        
<form>
    <label for="chat" class="sr-only">Your message</label>
    <div class="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
    <label for="chat" class="sr-only">Añadir Comentario</label>
        <textarea id="chat" rows="1" class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Añadir Comentario."></textarea>
            <button type="submit" class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
            <svg aria-hidden="true" class="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
            <span class="sr-only">Send message</span>
        </button>
    </div>
</form>
<ul id="comments-list" class="comments-list">
{comentariosState.length ? (

<>
{comentariosState.map((comentario) => (
  <Comentarios
  comentarios = {comentario}
  />
))}
</>
): (
  <p className="mt-10 shadow-lg w-full text-center p-5 uppercase font-bold text-2xl">
               No hay Comentarios Aun
             </p>
)}
</ul>

          <div className="flex justify-center gap-4 mt-12 mb-4 flex-wrap">
            <button
              className="bg-blue-700 text-white p-2 text-xl uppercase rounded-md font-semibold hover:bg-blue-600 transition-colors w-full md:w-72 lg:w-80"
              onClick={(e) => setModalEditar(true)}
            >
              Editar
            </button>
            <NavLink
             id={param.id}
             to={`/peliculas/Booking/${param.id}`}>
            <button
              className="bg-blue-700 text-white p-2 text-xl uppercase rounded-md font-semibold hover:bg-blue-600 transition-colors w-full md:w-72 lg:w-80"
              
            >
              Reservar
            </button>
            </NavLink>
            <button 
              className="bg-red-700 text-white p-2 text-xl uppercase rounded-md font-semibold hover:bg-red-600 transition-colors w-full md:w-72 lg:w-80"
              onClick={handelClick}
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
      {modalEditar && (
        <EditarPeliculas id={param.id} setModalEditar={setModalEditar} />
      )}
    </>
  );
};

export default DetallePelicula;
