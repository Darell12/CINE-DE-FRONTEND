import { useState, useEffect } from "react";
import './styles.css'

import usePeliculas from '../../hooks/usePeliculas';
import useAuth from "../../hooks/useAuth";

const Comentarios = ({comentarios}) => {

    const { auth, actualizarPerfil } = useAuth()
    const [ perfil, setPerfil] = useState({})

    const {_id, comentario,peliculaid, usuarioid} = comentarios

    useEffect( () => {
        setPerfil(auth.usuario)
        console.log(auth);
      }, [auth])

  return (
<>
    {comentarios.length ? (
        <>
         <p className="mt-10 shadow-lg w-full text-center p-5 uppercase font-bold text-2xl"> No hay comentarios disponibles</p>
        </>
    ): (
        <div class="comments-container">
	
		
			<li>
				<div class="comment-main-level">
					
					<div class="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg" alt=""/></div>
					
					<div class="comment-box">
						<div class="comment-head">
							<h6 class="comment-name"><a href="http://creaticode.com/blog">{perfil.nombre}</a></h6>
							<i class="fa fa-reply"></i>
							<i class="fa fa-heart"></i>
						</div>
						<div class="comment-content">
							{comentario}
						</div>
					</div>
				</div>		
			</li>
		
	</div>
    )}


	
    </>
  )
}

export default Comentarios