import { useContext } from "react";

import ComentariosContext from "../context/ComentariosProvider";

const useComentarios = () => useContext(ComentariosContext);

export default useComentarios