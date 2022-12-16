import {useContext} from "react";

import PeliculasContext from "../context/PeliculasProvider";

const usePeliculas = () => useContext(PeliculasContext)

export default usePeliculas