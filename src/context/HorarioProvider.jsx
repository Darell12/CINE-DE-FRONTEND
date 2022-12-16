import { createContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import clienteAxios from '../config/axios';



const   HorariosContext = createContext();

const HorarioProvider = ({children}) => {

    const [horarios, setHorarios] = useState([]);
    const [horarioState, setHorarioState] = useState({});
    const [horarioSelect, setHorarioSelect] = useState({});
    const [guardado, setGuardado] = useState(false);
    const [eliminado, setEliminado] = useState(false);
    const [editado, setEditado] = useState(false);
    

    useEffect(()=>{
        const obtenerHorarios = async () =>{
            try{

                const {data} = await clienteAxios('/horarios/get');
                setHorarios(data);
                
            } catch (error){
                console.log('Error' + error);
            }
        }
        obtenerHorarios();
    },[horarios]);

    const submitHorario = async formData => {
        console.log(formData)
        
        try {
            const {data} = await clienteAxios.post(`/horarios/create`, formData);
            setGuardado(true);
            setTimeout(() => {
                setGuardado(false);
            }, 1000)

        } catch (error) {
            console.log(error.message);
        }
    }

    const obtenerHorario = async (id) => {
        try {
            console.log(id)
            const {data} = await clienteAxios(`/horarios/get/${id}`);
            console.log(data)
            setHorarioState(data);
        } catch (error) {
            console.log(id)
            console.log("Error:" + error.message);
        }
    };

    const obtenerHorarioselect = async (id) => {
        try {
            console.log(id)
            const token = localStorage.getItem('idHorario')
            const {data} = await clienteAxios(`/horarios/getselect/${token}`);
            console.log(data)
            setHorarioSelect(data);
        } catch (error) {
            console.log(id)
            console.log("Error:" + error.message);
        }
    };

    const deleteHorario = async (id) => {
        try {
            await clienteAxios.delete(`/horarios/delete/${id}`);
            setEliminado(true)
            setTimeout(() =>{
                setEliminado(false);
            }, 1000);
        } catch (error) {
            console.log(error.message);
        }
    };

    const updateHorario = async (id) => {
        try {
            const {data} = await clienteAxios.put(`/horari/update/${id}`, datos);
            setEditado(true);
            setTimeout(() =>{
                setEditado(false);
            }, 1000);

        } catch (error) {
           console.log(error.message);
        }
    }
  return (
   <HorariosContext.Provider
   value={{
    submitHorario,
    horarioState,
    horarios,
    obtenerHorario,
    guardado,
    setEditado,
    setGuardado,
    setEliminado,
    updateHorario,
    deleteHorario,
    obtenerHorarioselect,
    horarioSelect
   }}
   >
    {children}
   </HorariosContext.Provider>

   
 )
}
export {HorarioProvider}
export default HorariosContext