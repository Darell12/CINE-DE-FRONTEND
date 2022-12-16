import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'
import { Navigate  } from 'react-router-dom';
import usePeliculas from "../../hooks/usePeliculas";


const EditarPelicula = ({ id, setModalEditar }) => {

  const { register, handleSubmit } = useForm();
  
  const { obtenerPelicula, peliculaState, eliminado, updatePeliculas, setPeliculaState, editado } = usePeliculas();

  useEffect(() => {
    obtenerPelicula(id);
  }, []);

  const { _id, titulo, genero, director, sinopsis, duracion, image } = peliculaState;

  //console.log(_id, nombre, description, typeof(precio), stock);

  const onSubmit = async (datos) => {

    //console.log(datos.precio);

    Swal.fire({
      title: 'Quieres guardar los cambios?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `No Guardar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        const formData = new FormData();
        formData.append("id", id);
        formData.append("image", datos.file[0]);
        formData.append("titulo", datos.titulo);
        formData.append("genero", datos.genero);
        formData.append("director", datos.director);
        formData.append("duracion", datos.duracion);
        formData.append("sinopsis", datos.sinopsis);

        usePeliculas(_id, formData);
        Swal.fire('Guardado!', '', 'success')

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Tu Producto ha sido guardado.',
          showConfirmButton: false,
          timer: 1500
        })

      } else if (result.isDenied) {
        Swal.fire('Los cambios no se guardaron', '', 'info')
      }
    })
  };


  return (
    <div className="flex justify-center bg-slate-500 absolute w-full h-screen top-0 bg-opacity-60 mt-24">
      {eliminado && <Navigate to="/peliculas"/>}
      {editado && <Navigate to="/peliculas"/>}
      <div className="h-full w-5/6">
        <div className="w-full py-5 flex items-center h-full mt-24">
          <form 
            className="px-5 mx-auto py-5 sm:px-9 sm:w-5/6 md:w-4/5 lg:w-3/4 shadow-lg bg-white rounded-xl"
            onSubmit={handleSubmit(onSubmit)}
          >
            <button
              onClick={(e) => setModalEditar(false)}
              className="text-black font-bold bg-white text-xl p-4 flex float-right hover:scale-110 "
            >
              X
            </button>

            <h1 className="font-bold text-6xl uppercase text-center w-full mx-auto">
              Edita tu <span className="text-sky-700">producto</span>
            </h1>

            
            <div className="mb-9 flex justify-center">
              <img
                src={image ? `${image.url}` : ""}
                alt={titulo}
                className="h-56 w-96 border-2"
              />
            </div>

            <div className="mb-5">
              <label htmlFor="titulo" className="font-medium">
                Titulo
              </label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                className="block placeholder-slate-400 p-2 w-full bg-slate-100"
                placeholder="ej: Desinfectante"
                value={titulo || ''}
                onChange={ e => setPeliculaState({
                  ...peliculaState, 
                  [e.target.name] : e.target.value
                })}
                {...register("titulo")}
              />
            </div>
            <div className="mb-5">
              <label htmlFor="sinopsis" className="font-medium">
                Sinopsis
              </label>
              <textarea
                id="sinopsis"
                name="sinopsis"
                className="block placeholder-slate-400 p-2 w-full bg-slate-100 h-52"
                placeholder="..."
                value={sinopsis || ''}
                onChange={ e => setPeliculaState({
                  ...peliculaState, 
                  [e.target.name] : e.target.value
                })}
                {...register("sinopsis")}
              />
            </div>
            <div className="mb-5">
              <label htmlFor="duracion" className="font-medium">
                Duracion
              </label>
              <div className="flex items-center">
               
                <input
                  type="text"
                  id="duracion"
                  name="duracion"
                  className="placeholder-slate-400 p-2 w-full bg-slate-100"
                  placeholder="ej: 200000"
                  value={duracion || ''}
                  onChange={ e => setPeliculaState({
                    ...peliculaState, 
                    [e.target.name] : e.target.value
                  })}
                  {...register("duracion")}
                />
              </div>
            </div>
            <div className="mb-5">
              <label htmlFor="genero" className="font-medium">
                Genero
              </label>
              <input
                type="text"
                id="genero"
                name="genero"
                className="block placeholder-slate-400 p-2 w-full bg-slate-100"
                placeholder="ej: 5"
                value={genero || ''}
                  onChange={ e => setPeliculaState({
                    ...peliculaState, 
                    [e.target.name] : e.target.value
                  })}
                  {...register("genero")}
              />
            </div>
            <div className="mb-5">
              <label htmlFor="director" className="font-medium">
                Director
              </label>
              <input
                type="text"
                id="director"
                name="director"
                className="block placeholder-slate-400 p-2 w-full bg-slate-100"
                placeholder="ej: 5"
                value={director || ''}
                  onChange={ e => setPeliculaState({
                    ...peliculaState, 
                    [e.target.name] : e.target.value
                  })}
                  {...register("director")}
              />
            </div>
            <div className="mb-5">
              <label htmlFor="stock" className="font-medium">
                Imagen
              </label>
              <input
                type="file"
                id="image"
                name="image"
                className="block placeholder-slate-400 p-2 w-full bg-slate-100"
                {...register("file")}
              />
            </div>
            <input
              type="submit"
              value="Guardar"
              className="font-medium uppercase bg-sky-700 text-white p-2 rounded-md w-full cursor-pointer hover:bg-sky-500"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditarPelicula;
