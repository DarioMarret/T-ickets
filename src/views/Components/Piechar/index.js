import { useEffect } from "react"
import Chart from "react-google-charts"
export default function PiecharViews({ ...props }) {


    return (
        <>
            <Chart
                chartType="PieChart"
                data={props.datas}
                options={props.options}
                width={"100%"}
                height={"400px"}
            />
        </>
    )
}