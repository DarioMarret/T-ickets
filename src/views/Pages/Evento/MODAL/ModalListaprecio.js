import { Modal } from "react-bootstrap";
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { Columnasubcrito } from "utils/ColumnTabla";
import { Box, IconButton } from "@mui/material";
import { Visibility } from "@mui/icons-material";
export default function ListarPreciView(){
    return(
        <Modal
        fullscreen={true}
        >
            <Modal.Body>
                <MaterialReactTable
                    columns={Columnasubcrito}
                    data={[]}
                    muiTableProps={{
                        sx: {
                            tableLayout: 'fixed'
                        }
                    }}
                    enableRowActions
                    renderRowActions={({ row }) => (
                        <Box sx={{ display: 'flex' }}>
                            <IconButton
                                color="error"
                                onClick={() => abbrir(row)}
                            >
                                <Visibility />
                            </IconButton>
                        </Box>
                    )}
                    positionToolbarAlertBanner="bottom"
                    localization={MRT_Localization_ES}
                />
            </Modal.Body>
        </Modal>
    )
}