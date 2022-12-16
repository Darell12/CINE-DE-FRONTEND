import { Navigate  } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';

import usePeliculas from "../../hooks/usePeliculas";
import useReserva from '../../hooks/useReserva';

import Navbar from "../../components/Navbar";
import Alerta from '../../components/Alerta';

const FormularioPeliculas = () => {

  const { register, handleSubmit } = useForm();
  const { submitPelicula, guardado } = usePeliculas();
  

  const onSubmit = (datos) => {
    //e.preventDefault();

    const formData = new FormData();

    formData.append("image", datos.file[0]);
    formData.append("titulo", datos.titulo);
    formData.append("genero", datos.genero);
    formData.append("director", datos.director);
    formData.append("duracion", datos.duracion);
    formData.append("sinopsis", datos.sinopsis);
    
    submitPelicula(formData);

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Tu Pelicula ha sido guardado.',
      showConfirmButton: false,
      timer: 1500
    })

  };

  return (
    <>
      <Navbar texto="Peliculas" ruta="" />
      <div className=" w-full justify-center h-5/6 items-center mt-24">
        {guardado && <Navigate to="/peliculas"/>} 
        <div className="w-full">
          <h1 className="font-bold text-6xl uppercase text-center w-full mx-auto">
            Registra tus <span className="text-sky-700">peliculas</span>
          </h1>

          <form
            className="px-5 mx-auto py-5 sm:px-9 sm:w-5/6 md:w-4/5 lg:w-3/4 shadow-lg bg-white rounded-xl"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-5">
              <label htmlFor="titulo" className="font-medium">
                Titulo
              </label>
              <input
                type="text"
                id="titulo"
                className="block placeholder-slate-400 p-2 w-full bg-slate-100"
                placeholder="Titulo Pelicula"
                {...register("titulo", { required: true })}
                required
              />
            </div>
            <div className="mb-5">
              <label htmlFor="genero" className="font-medium">
                Genero
              </label>
              <textarea
                type="text"
                id="genero"
                className="block placeholder-slate-400 p-2 w-full bg-slate-100 h-52"
                placeholder="genero Pelicula"
                {...register("genero", { required: true })}
                required
              />
            </div>
            <div className="mb-5">
              <label htmlFor="director" className="font-medium">
                Director
              </label>
              <input
                type="text"
                id="director"
                className="block placeholder-slate-400 p-2 w-full bg-slate-100"
                placeholder="director Pelicula"
                {...register("director", { required: true })}
                required
              />
            </div>
            <div className="mb-5">
              <label htmlFor="duracion" className="font-medium">
                Duracion
              </label>
              <input
                type="text"
                id="duracion"
                className="block placeholder-slate-400 p-2 w-full bg-slate-100"
                placeholder="Duracion Pelicula"
                {...register("duracion", { required: true })}
                required
              />
            </div>
            <div className="mb-5">
              <label htmlFor="sinopsis" className="font-medium">
                Sinopsis
              </label>
              <input
                type="text"
                id="Sinopsis"
                className="block placeholder-slate-400 p-2 w-full bg-slate-100"
                placeholder="Sinopsis Pelicula"
                {...register("sinopsis", { required: true })}
                required
              />
            </div>
            <div className="mb-5">
              <label htmlFor="imagen" className="font-medium">
                Imagen
              </label>
              <input
                type="file"
                id="image"
                className="block placeholder-slate-400 p-2 w-full bg-slate-100"
                {...register("file")} 
              />
            </div>
            <input
              type="submit"
              value="Guardar"
              className="uppercase bg-sky-700 text-white p-2 rounded-md w-full cursor-pointer"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default FormularioPeliculas;
