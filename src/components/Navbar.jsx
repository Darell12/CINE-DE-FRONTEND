import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-empresa.png";
import svg60 from "../assets/svg/icons8-menu-30.svg";


import useAuth from "../hooks/useAuth";



const Navbar = ({ texto, ruta, id, perfil, verVenta, verCompras }) => {
  
  const { cerrarSesion }  = useAuth();
  const [ver, setVer] = useState(false);
  const [asideVentas, setAsideVentas] = useState(false);

  const mostrarBarra = (n) => (ver ? setVer(false) : setVer(true));
  const mostrarAside = (n) => (asideVentas ? setAsideVentas(false) : setAsideVentas(true));

  // const { articulosCarritos } = useVenta();

  return (
    <nav className="shadow bg-slate-200 mb-5 flex fixed z-10 w-full top-0">
      <div className="max-md:hidden w-full flex justify-between px-5 items-center gap-2">
        
<h1 class="flex items-center text-3xl font-extrabold dark:text-white">Cine<span class="bg-blue-100 text-blue-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-2">DE</span></h1>

        <input
          type="search"
          placeholder="Buscar Pelicula"
          className="my-3 p-3 h-10 rounded-lg w-1/2 border-2"
        />
        <div className="flex gap-3">

          {!perfil && (
            <button type="button" className="hover:scale-110 transition-all">
              <Link
                to={`/perfil`}
                className="text-black p-2 w-full flex cursor-pointer font-medium hover:border-b-blue-500 hover:border-b-2 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6"
                >
                  <path
                    // 
                    // 
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </Link>
            </button>
          )}

          <button
            type="button"
            className="hover:scale-110 transition-all  hover:border-b-2 hover:border-b-blue-500"
          >
            <Link
              to={`/peliculas/${ruta}`}
              className="uppercase text-black p-2 w-full cursor-pointer font-medium  transition-all"
            >
              {texto}
            </Link>
          </button>

          <button
            type="button"
            className="bg-sky-700 text-white rounded-lg uppercase font-medium hover:bg-sky-500 transition-colors"
          >
            <Link 
              to={"/"} 
              className="p-2 text-center w-full flex mr-1"
              onClick={cerrarSesion}  
            >
              Cerrar Sesion
            </Link>
          </button>
        </div>
      </div>
      <div className="md:hidden w-full flex justify-between px-5 items-center overflow-hidden z-10">
      <h2 class="text-4xl font-bold dark:text-white">CineDE</h2>
        <button onClick={mostrarBarra}>
          <img src={svg60} alt="menu hamburguesa" />
        </button>
        {ver && (
          <div className="flex flex-col gap-3 absolute top-10 left-0 w-full bg-slate-200 p-4 justify-between">
            <input
              type="search"
              placeholder="Buscar Pelicula"
              className="my-3 p-3 h-10 rounded-lg border-2"
            />
            

            {!perfil && (
              <button type="button">
                <Link
                  to={`/perfil`}
                  className="gap-2 text-black p-2 w-full flex justify-center cursor-pointer font-medium hover:border-b-blue-500 hover:border-b-2 bg-slate-200 transition-all"
                >
                  Perfil
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </Link>
              </button>
            )}

            <button type="button">
              <Link
                to={`/peliculas/${ruta}`}
                className="gap-2 text-black p-2 w-full flex justify-center cursor-pointer font-medium hover:border-b-blue-500 hover:border-b-2 bg-slate-200 transition-all"
              >
                {texto}
              </Link>
            </button>

            <button
              type="button"
              className="bg-sky-700 text-white rounded-lg uppercase font-medium hover:bg-sky-500 transition-colors"
            >
              <Link to={"/"} 
              className="p-2 w-full flex justify-center"
              onClick={cerrarSesion}  
            >
                Cerrar Sesion
              </Link>
            </button>
          </div>
        )}
      </div>
     
    </nav>
  );
};

export default Navbar;
