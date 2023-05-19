import { useDispatch, useSelector } from "react-redux";

export default function OpcionMesa(props){
    let { localidades, setItems } = props;
    let usedispatch = useDispatch();
    let moda = useSelector(state => state.SuscritorSlice.modal)
    return(
        <div>

        </div>
        )
}