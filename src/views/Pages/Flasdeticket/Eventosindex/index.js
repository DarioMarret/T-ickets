import { Pagination, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setPagination } from "StoreRedux/Slice/SuscritorSlice";
export default function EventosView({ ...props }) {
    let page = useSelector(state => state.SuscritorSlice.page)
    let usedispatch = useDispatch()
    const handleChange = (event, value) => {
        if (value == 1) {
            usedispatch(setPagination({ inicio: 0, final: 4, page: value }))
            return
        }
        let principio = value * 4
        usedispatch(setPagination({ inicio: parseInt(principio) -4, final: parseInt(principio)/2 + 4, page: value }))
    };
    return (
        <div className=" container-fluid text-end">
            <Box my="2" display="flex" justifyContent="end" >
                {props.eventoslist.length > 4 ?
                    <Pagination 
                        count={Math.round(props.eventoslist.length /4)}
                        size="large"
                        boundaryCount={5}
                        page={page}
                        onChange={handleChange}
                    /> : ""}
            </Box>
        </div>
    )
}