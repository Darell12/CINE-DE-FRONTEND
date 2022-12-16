import { createContext, useState, useEffect} from "react";
import clienteAxios from "../config/axios";
import Swal from "sweetalert2";

const ReservaContext = createContext();

import usePeliculas from "../hooks/usePeliculas";
import useAuth from "../hooks/useAuth";

const ReservaProvider = ({children}) => {

    const [ auth ] = useAuth();
    const [peliculas] = usePeliculas();
    const [reservas,  setReservas] = useState([]);
    const [reservaState, setReservaState] = useState({});
    const [precioTotal, setPrecioTotal] = useState(0);
    const [guardado, setGuardado] = useState(false)

    const {usuario} = auth;

    useEffect(() => {
        const obtenerReservas = async () => {
            try {
                const {data} = await clienteAxios('/reservacion/get');
                setReservas(data);
            } catch (error) {
                console.log("error" + error.message);
            }
        };    
        obtenerReservas();     
    });

    const registrar = async formData => {
        console.log(formData);
        try {
            const {data} = await clienteAxios.post('/reservacion/', formData);
            setGuardado(true);
            setTimeout(() => {
                setGuardado(false);
            }, 1000)
        } catch (error) {  
            console.log(error.message)
        }
    }

    return (
        <ReservaContext.Provider
        value={{
            registrar,
            guardado,
            setGuardado,

        }}
        >
            {children}
        </ReservaContext.Provider>

    )
}

export {ReservaProvider}
export default ReservaContext