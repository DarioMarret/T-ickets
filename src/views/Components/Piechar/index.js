import { useEffect } from "react"
import Chart from "react-google-charts"
export default function PiecharViews({ ...props }) {


    return (
        <>
            <Chart
                chartType="PieChart"
                data={props.datas}
                options={props.options}
                width={"400px"}
                height={"400px"}
            />
        </>
    )
}