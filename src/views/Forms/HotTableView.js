
import { HotTable } from '@handsontable/react-wrapper';

const HotTableView = (props) => {

    return (
        <HotTable className="hot ht-theme-main " 
            {...props}
            stretchH="all" // Expande columnas al ancho disponible
        />
    );
};

export default HotTableView;
   