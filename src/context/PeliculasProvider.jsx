import { useState, useEffect, createContext } from "react"
import clienteAxios from "../config/axios"

const PeliculasContext = createContext();


const PeliculasProvider = ({ children }) => {

    const [peliculas, setPeliculas] = useState([]);
    const [peliculaState, setPeliculaState] = useState({});
    const [guardado, setGuardado] = useState(false);
    const [eliminado, setEliminado] = useState(false);
    const [editado, setEditado] = useState(false);

    useEffect(() => {
        const obtenerPeliculas = async () =>{
            try {
                
                const {data} = await clienteAxios('/peliculas/get');
                setPeliculas(data);
                

            } catch (error) {
                console.log('Error' + error);  
            }
        };
        obtenerPeliculas();
    }, [peliculas])

    const submitPelicula = async formData => {
        console.log(formData);

        try {
            const {data} = await clienteAxios.post(`/peliculas/create`, formData);
            setGuardado(true);
            setTimeout(() => {
                setGuardado(false);
            }, 1000)

        } catch (error) {
            console.log(error.message);
        }
    };

    const obtenerPelicula = async (id) => {
    try {
        console.log(id)
        const {data} = await clienteAxios(`/peliculas/get/${id}`);
        setPeliculaState(data);
        console.log(peliculaState)
    } catch (error) {
        console.log(id)
        console.log("Error:" + error.message);
    }
    };

    const deletePelicula = async (id) =>{
        try {
            await clienteAxios.delete(`/peliculas/delete/${id}`);
            setEliminado(true)
            setTimeout(() =>{
                setEliminado(false);
            }, 1000);
        } catch (error) {
            console.log(error.message);
        }
    };

    const updatePeliculas = async (id,datos) => {
        try {
            const {data} = await clienteAxios.put(`/peliculas/update/${id}`, datos);
            setEditado(true);
            setTimeout(() =>{
                setEditado(false);
            }, 1000);

        } catch (error) {
           console.log(error.message);
        }
    };

    const registrar = async formData => {
        console.log(formData);
        try {
            const {data} = await clienteAxios.post('/reservacion/', formData);
            setGuardado(true);
            setTimeout(() => {
                setGuardado(false);
            }, 1000)
        } catch (error) {  
            console.log(error)
        }
    }
  return (
    <PeliculasContext.Provider
    value={{
        submitPelicula,
        peliculas,
        peliculaState,
        obtenerPelicula,
        guardado,
        setGuardado,
        deletePelicula,
        eliminado,
        setEliminado,
        updatePeliculas,
        editado,
        setEditado,
        registrar
    }}
    >
        {children}
    </PeliculasContext.Provider>
  )
}

export  {PeliculasProvider}

export default PeliculasContext