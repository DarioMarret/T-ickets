import { Cargarsillas } from "views/Components/MODAL/cargarsillas.js";
import { addususcritor } from "StoreRedux/Slice/SuscritorSlice";
import { deletesuscrito } from "StoreRedux/Slice/SuscritorSlice";
import { cargalocalidad, clearMapa, filtrarlocali, } from "StoreRedux/Slice/mapaLocalSlice";
import { cargarsilla } from "StoreRedux/Slice/sillasSlice.js";
import { setModal } from "StoreRedux/Slice/SuscritorSlice.js";
import { borrarseleccion } from "StoreRedux/Slice/sillasSlice";
export const todossiler = { Cargarsillas, addususcritor, deletesuscrito, cargalocalidad, clearMapa, filtrarlocali, cargarsilla, setModal, borrarseleccion }