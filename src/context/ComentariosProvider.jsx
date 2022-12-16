import { useState, useEffect, createContext } from "react"
import clienteAxios from "../config/axios"

const ComentariosContext = createContext();


const ComentariosProvider = ({ children }) => {

    const [comentarios, setComentarios] = useState([]);
    const [comentariosState, setComentariosState] = useState({});
    const [guardado, setGuardado] = useState(false);
    const [eliminado, setEliminado] = useState(false);
    const [editado, setEditado] = useState(false);

    useEffect(() => {
        const obtenerComentarios = async () =>{
            try {
                
                const {data} = await clienteAxios('/comentarios/get');
                setComentarios(data);
                

            } catch (error) {
                console.log('Error' + error);  
            }
        };
        obtenerComentarios();
    }, [comentarios])

    const submitComentario = async formData => {
        console.log(formData);

        try {
            const {data} = await clienteAxios.post(`/comentarios/create`, formData);
            setGuardado(true);
            setTimeout(() => {
                setGuardado(false);
            }, 1000)

        } catch (error) {
            console.log(error.message);
        }
    };

    const obtenerComentariosPeli = async (id) => {
    try {
        console.log(id)
        const {data} = await clienteAxios(`/comentarios/gets/${id}`);
        console.log(data)
        setComentariosState(data);
    } catch (error) {
        console.log(id)
        console.log("Error:" + error.message);
    }
    };

    const deleteComentario = async (id) =>{
        try {
            await clienteAxios.delete(`/comentarios/delete/${id}`);
            setEliminado(true)
            setTimeout(() =>{
                setEliminado(false);
            }, 1000);
        } catch (error) {
            console.log(error.message);
        }
    };

    const updateComentario = async (id,datos) => {
        try {
            const {data} = await clienteAxios.put(`/comentarios/update/${id}`, datos);
            setEditado(true);
            setTimeout(() =>{
                setEditado(false);
            }, 1000);

        } catch (error) {
           console.log(error.message);
        }
    };


  return (
    <ComentariosContext.Provider
    value={{
        submitComentario,
        updateComentario,
        obtenerComentariosPeli,
        deleteComentario,
        guardado,
        eliminado,
        editado,
        comentariosState

        
    }}
    >
        {children}
    </ComentariosContext.Provider>
  )
}

export  {ComentariosProvider}

export default ComentariosContext