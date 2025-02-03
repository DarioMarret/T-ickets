import { useEffect } from "react"
import Chart from "react-google-charts"
export default function PiecharViews({ ...props }) {

    console.log(props.datas.map(((ele, id) => {
        if (id == 0) return [ele[0], "cantidad", { role: "annotation" }]
        return [ele[0], ele[1], ""+ele[1]]
    })),props)
    return (
        <div className=" d-flex flex-column ">
            <Chart chartType="ColumnChart" width="100%" height="100%" data={props.datas.map(((ele, id) => {
                if (id == 0) return [...ele, { role: "annotation" }]
                return [ele[0], ele[1], "" + ele[1]]
            }))}
                options={{
                    title: "Cantidad por localida",
                    bar: { groupWidth: "70%" },
                    legend: { position: "none" },
                    label:"Cantidad",
                    annotations: {
                        textStyle: {
                            fontSize: 12,
                            bold: true,
                        },
                    },
                }}
            />
            <Chart
                chartType="PieChart"
                data={props.datas}
                options={props.options}
                width={"auto"}
                height={"400px"}
            />
        </div>
    )
}