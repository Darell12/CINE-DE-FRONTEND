import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


// Context
import { AuthProvider  } from './context/AuthProvider';
import { UsuariosProvider } from './context/UsuariosProvider'
import { HorarioProvider } from './context/HorarioProvider';
import {PeliculasProvider} from './context/PeliculasProvider';
import { ComentariosProvider } from './context/ComentariosProvider';

// Layout  (LayoutAuth)
import LayoutAuth from './Layout/LayoutAuth'
import RutaProtegida from './Layout/RutaProtegida'

// pages (usuarios)
import Login from './pages/Login'
import Registro from './pages/usuario/Registro'
import OlvidePassword from './pages/usuario/OlvidePassword'
import Confirmar from './pages/usuario/Confirmar'
// pages (usuarios protegidas)
import Perfil from './pages/usuario/Perfil'
import CambiarPassword from './pages/usuario/CambiarPassword.jsx'






//pages (Peliulas)
import ListaPeliculas from './pages/peliculas/ListaPeliculas';
import FormularioPeliculas from './pages/peliculas/FormularioPeliculas';
import DetallePelicula from './pages/peliculas/DetallePelicula';

import Booking from './pages/peliculas/Booking';
import FormReserva from './pages/peliculas/FormReserva';
import Comentarios from './pages/peliculas/Comentarios';



function App() {

  return (
    <Router>
      <AuthProvider>
        <UsuariosProvider>
          <PeliculasProvider>
            <HorarioProvider>
              <ComentariosProvider>
              <Routes>
                {/* RUTAS PUBLICAS */}
                <Route path='/' element={<LayoutAuth />}>
                  <Route index element={<Login />} />
                  <Route path='registro' element={<Registro />} />
                  <Route path='olvide-password' element={<OlvidePassword />} />
                  <Route path='confirmar/:id' element={<Confirmar />} />
                </Route>

                {/* Rutas Protegidas */}
                <Route path='/perfil' element={<RutaProtegida />}>
                    <Route index element={<Perfil />} />
                    <Route path="cambiar-password" element={<CambiarPassword/>} />
                </Route>


                <Route path='/peliculas' element={<RutaProtegida />}>
                  <Route index element={<ListaPeliculas />} />
                  <Route path='agregar-pelicula' element={<FormularioPeliculas />} />
                  <Route path='detalle-pelicula/:id' element={<DetallePelicula />} />
                  <Route path='Booking/:id' element={<Booking/>}/>
                  <Route path='Booking/:id/form-reserva/:id' element={<FormReserva/>}/>
                  
                </Route>

{/* 
                <Route path='/venta' element={<RutaProtegida />}>
                  <Route index element={<DetalleVenta />} />
                  <Route path='compras-realizadas' element={<ListaVentas />} />
                </Route> */}

              </Routes>
              </ComentariosProvider>
              </HorarioProvider>
          </PeliculasProvider>
        </UsuariosProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
