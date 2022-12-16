import { useContext } from "react";

import ReservaContext from "../context/ReservaProvider";

const useReserva = () => useContext(ReservaContext);

export default useReserva;