import { useContext } from "react";

import HorariosContext from "../context/HorarioProvider";

const useHorarios = () => useContext(HorariosContext);

export default useHorarios;