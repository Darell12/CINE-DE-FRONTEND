import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";


import useAuth from "../../hooks/useAuth";
import usePeliculas from "../../hooks/usePeliculas";
import useHorarios from "../../hooks/useHorario";
import useReserva from "../../hooks/useReserva";

import {MdEventSeat,MdOutlineNorth} from 'react-icons/md'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Navbar from "../../components/Navbar";


import { formatearFechaReserva } from "../../helpers/formatearFechaReserva";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";
import { formatearCantidad } from "../../helpers/formatearCantidad";


const FormReserva = () => {

    const { register, handleSubmit } = useForm();
    const { auth, actualizarPerfil } = useAuth()
    const [ perfil, setPerfil] = useState({})
    const [ horario, setHorario] = useState();
    const [ fecha, setFecha] = useState();
    const [ silla, setSilla] = useState([]);
    const [ Csillas, setCsillas] = useState(0);
    const [ totalP, setTotal] = useState(0);
    const [ NumSilla, setNumSilla] = useState(0);
    const [ idusuario, setidusuario] = useState(localStorage.getItem('idusuario'));

    const param = useParams();

    const { obtenerPelicula, peliculaState, peliculas, registrar} = usePeliculas();
    const { obtenerHorarios, obtenerHorario, horarioState, horarios, obtenerHorarioselect, horarioSelect } = useHorarios();
    // const {registrar, guardado} = useReserva();
    
    const { titulo, genero, director, duracion, sinopsis, image } = peliculaState;
    const token = localStorage.getItem('token');


    const onSubmit = (datos) => {

        setTotal(NumSilla*Csillas)

    const formData = new FormData();



    formData.append("fecha", datos.fecha);
    formData.append("usuarioid", datos.usuarioid);
    formData.append("usuario", datos.nombre);
    formData.append("telefono", datos.telefono);
    formData.append("peliculaid", datos.peliculaid);
    formData.append("nombrePelicula", datos.nombrePelicula)
    formData.append("asientos", datos.asientos);
    formData.append("ticketPrice", datos.ticketPrice);
    formData.append("total", totalP);
    
    setTimeout(() => {
        registrar(formData);
    }, 1000)

    

    console.log(datos.total);
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Tu reserva ha sido realizadda.',
        showConfirmButton: false,
        timer: 1500
      })
    }
   

    useEffect(() => {
        obtenerHorarioselect();
        console.log(horarioSelect) 
        setFecha(localStorage.getItem('fechares'))
      }, []);
    
      useEffect(() => {
        obtenerPelicula(param.id);
        console.log(peliculaState)
      }, []);

      useEffect( () => {
        setPerfil(auth.usuario)
        console.log(auth);
      }, [auth])
    let array = []
    let total = 0;
    const onChangeTipoSilla = (e) => {
        setCsillas(e.target.value)  
        console.log("funcionando")
    }

    const calcularTotal = (e) =>{
        setNumSilla(e.target.value);
        
        console.log("evendo detectado")
    }

    const onChangeForm = (e) =>{
        console.log("EVENTO DETECTADO!")

        setTotal(NumSilla*Csillas)
        console.log(totalP)

    }

    const onClickTotal = (e) => {
        setTotal(NumSilla*Csillas)
        console.log(totalP)
    }
  return (
    <>
    <Navbar texto="Peliculas" ruta="" />
    <div className="w-full flex flex-col items-center mt-9">
<div className="max-w-2xl mx-auto bg-white p-16">

<form
onSubmit={handleSubmit(onSubmit)}
onChange={onChangeForm}
>
<div className="grid gap-6 mb-6 lg:grid-cols-2">
    <div>
        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nombre</label>
        <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required
        value={perfil.nombre}
        readOnly
        {...register("nombre", {required: true})}
        />
    </div>
    <div>
        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">id usuario</label>
        <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required
        value={idusuario}
        readOnly
        {...register("usuarioid", {required: true})}
        />
    </div>
    <div>
        <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Correo Electronico  </label>
        <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required
        value={perfil.email}
        readOnly
        />
    </div>
    <div>
        <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Telefono</label>
        <input type="text" id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Flowbite" required
        value={perfil.telefono}
        readOnly
        {...register("telefono", {required: true})}
        />
    </div>  
    <div>
        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Pelicula</label>
        <input type="text" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" required
        value={titulo}
        readOnly
        {...register("nombrePelicula", { required: true })}
        />
    </div>
    <div>
        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Id Pelicula</label>
        <input type="text" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" required
        value={param.id}
        readOnly
        {...register("peliculaid", { required: true })}
        />
    </div>
    <div>
        <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Horario Escogido</label>
        <input type="text" id="website" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="flowbite.com" required
        value={fecha}
        readOnly
        {...register("fecha", {required: true})}
        />
    </div>
    <div>
        <label htmlFor="visitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Asientos a Reservar</label>
        <select list="asientos" id="visitors" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required
        onInput={onChangeTipoSilla}
        {...register("ticketPrice", {required: true})}
        >
        <option value="">Porfavor seleccione su tipo de asiento</option>
        <option value="6900">General: $6.900</option>
    <option value="12600">Premiun: $12.600</option>
    <option value="15000">VIP: $15.000</option>
        </select>


    </div>
</div>
<div className="mb-6">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Numero de Asientos</label>
    <input type="number" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="[A2,B2,C2]" required
    onInput={calcularTotal}
    {...register("asientos", {required: true})}
    />
</div> 
<div className="mb-6">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Total a pagar</label>
    <input type="text" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="HAGA CLICK PARA REVELAR SU TOTAL A PAGAR" required
    onClick={onClickTotal}
    value={totalP}
    readOnly
    {...register("total", {required: true})}
    />
</div>  
<div className="flex items-start mb-6">
    <div className="flex items-center h-5">
    <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required/>
    </div>
    <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400">Estoy conciente de la <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">información de mi reserva</a>.</label>
</div>
<button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Completar Reserva</button>
</form>
</div>
</div>

{/* <table>
	<tbody>
		<tr>
            <td><button  onClick={onClickSave} value="H1" className="butaca libre">H1</button></td>
            <td><button  onClick={onClickSave} value="H2" className="butaca libre">H2</button></td> 
			<td><MdOutlineNorth/></td>
            <td><button  onClick={onClickSave} value="H3" className="butaca libre">H3</button></td>
			<td><button  onClick={onClickSave} value="H4" className="butaca libre">H4</button></td>
			<td><button  onClick={onClickSave} value="H5" className="butaca libre">H5</button></td>
			<td><button  onClick={onClickSave} value="H6" className="butaca libre">H6</button></td>
			<td><MdOutlineNorth/></td>
			<td><button  onClick={onClickSave} value="H7" className="butaca libre">H7</button></td>
			<td><button  onClick={onClickSave} value="H8" className="butaca libre">H8</button></td>
			
			
		</tr>
		<tr>
            <td><button  onClick={onClickSave} value="G1" className="butaca libre">G1</button></td>
            <td><button  onClick={onClickSave} value="G2" className="butaca libre">G2</button></td> 
			<td><MdOutlineNorth/></td>
            <td><button  onClick={onClickSave} value="G3" className="butaca libre">G3</button></td>
			<td><button  onClick={onClickSave} value="G4" className="butaca libre">G4</button></td>
			<td><button  onClick={onClickSave} value="G5" className="butaca libre">G5</button></td>
			<td><button  onClick={onClickSave} value="G6" className="butaca libre">G6</button></td>
			<td><MdOutlineNorth/></td>
			<td><button  onClick={onClickSave} value="G7" className="butaca libre">G7</button></td>
			<td><button  onClick={onClickSave} value="G8" className="butaca libre">G8</button></td>
		</tr>
		<tr>
            <td><button  onClick={onClickSave} value="F1" className="butaca libre">F1</button></td>
            <td><button  onClick={onClickSave} value="F2" className="butaca libre">F2</button></td> 
			<td><MdOutlineNorth/></td>
            <td><button  onClick={onClickSave} value="F3" className="butaca libre">F3</button></td>
			<td><button  onClick={onClickSave} value="F4" className="butaca libre">F4</button></td>
			<td><button  onClick={onClickSave} value="F5" className="butaca libre">F5</button></td>
			<td><button  onClick={onClickSave} value="F6" className="butaca libre">F6</button></td>
			<td><MdOutlineNorth/></td>
			<td><button  onClick={onClickSave} value="F7" className="butaca libre">F7</button></td>
			<td><button  onClick={onClickSave} value="F8" className="butaca libre">F8</button></td>
		</tr>
		<tr>
            <td><button  onClick={onClickSave} value="E1" className="butaca libre">E1</button></td>
            <td><button  onClick={onClickSave} value="E2" className="butaca libre">E2</button></td> 
			<td><MdOutlineNorth/></td>
            <td><button  onClick={onClickSave} value="E3" className="butaca libre">E3</button></td>
			<td><button  onClick={onClickSave} value="E4" className="butaca libre">E4</button></td>
			<td><button  onClick={onClickSave} value="E5" className="butaca libre">E5</button></td>
			<td><button  onClick={onClickSave} value="E6" className="butaca libre">E6</button></td>
			<td><MdOutlineNorth/></td>
			<td><button  onClick={onClickSave} value="E7" className="butaca libre">E7</button></td>
			<td><button  onClick={onClickSave} value="E8" className="butaca libre">E8</button></td>
		</tr>
		<tr>
            <td><button  onClick={onClickSave} value="D1" className="butaca libre">D1</button></td>
            <td><button  onClick={onClickSave} value="D2" className="butaca libre">D2</button></td> 
			<td><MdOutlineNorth/></td>
            <td><button  onClick={onClickSave} value="D3" className="butaca libre">D3</button></td>
			<td><button  onClick={onClickSave} value="D4" className="butaca libre">D4</button></td>
			<td><button  onClick={onClickSave} value="D5" className="butaca libre">D5</button></td>
			<td><button  onClick={onClickSave} value="D6" className="butaca libre">D6</button></td>
			<td><MdOutlineNorth/></td>
			<td><button  onClick={onClickSave} value="D7" className="butaca libre">D7</button></td>
			<td><button  onClick={onClickSave} value="D8" className="butaca libre">D8</button></td>
		</tr>
		<tr>
            <td><button  onClick={onClickSave} value="C1" className="butaca libre">C1</button></td>
            <td><button  onClick={onClickSave} value="C2" className="butaca libre">C2</button></td> 
			<td><MdOutlineNorth/></td>
            <td><button  onClick={onClickSave} value="C3" className="butaca libre">C3</button></td>
			<td><button  onClick={onClickSave} value="C4" className="butaca libre">C4</button></td>
			<td><button  onClick={onClickSave} value="C5" className="butaca libre">C5</button></td>
			<td><button  onClick={onClickSave} value="C6" className="butaca libre">C6</button></td>
			<td><MdOutlineNorth/></td>
			<td><button  onClick={onClickSave} value="C7" className="butaca libre">C7</button></td>
			<td><button  onClick={onClickSave} value="C8" className="butaca libre">C8</button></td>
		</tr>
		<tr>
            <td><button  onClick={onClickSave} value="B1" className="butaca libre">B1</button></td>
            <td><button  onClick={onClickSave} value="B2" className="butaca libre">B2</button></td> 
			<td><MdOutlineNorth/></td>
            <td><button  onClick={onClickSave} value="B3" className="butaca libre">B3</button></td>
			<td><button  onClick={onClickSave} value="B4" className="butaca libre">B4</button></td>
			<td><button  onClick={onClickSave} value="B5" className="butaca libre">B5</button></td>
			<td><button  onClick={onClickSave} value="B6" className="butaca libre">B6</button></td>
			<td><MdOutlineNorth/></td>
			<td><button  onClick={onClickSave} value="B7" className="butaca libre">B7</button></td>
			<td><button  onClick={onClickSave} value="B8" className="butaca libre">B8</button></td>
		</tr>
		<tr>
            <td><button  onClick={onClickSave} value="A1" className="butaca libre">A1</button></td>
			<td><button  onClick={onClickSave} value="A2" className="butaca libre">A2</button></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
            <td><button  onClick={onClickSave} value="A3" className="butaca libre">A3</button></td>
			<td><button  onClick={onClickSave} value="A4" className="butaca libre">A4</button></td>
		</tr>
	</tbody>
</table> */}
</>
  )
}

export default FormReserva