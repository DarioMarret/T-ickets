import { useEffect } from "react"
import { Chart } from "react-google-charts"
export default function PiecharViewsSlect({ ...props }) {


    return (
        <div className=" d-flex flex-column">
            <Chart chartType="ColumnChart" width="100%" height="100%" data={props.datas}
                options={{
                    title: "Density of Precious Metals, in g/cm^3",
                    bar: { groupWidth: "70%" },
                    legend: { position: "none" },
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
                options={{
                    legend: "none",
                    chartArea: { left: 10, top: 18, right: 10, bottom: 45 },
                    pieSliceText: "label",
                    //height:300
                }}

                chartPackages={["corechart", "controls"]}
                chartWrapperParams={{ view: { columns: [0, 2] } }}
                /* controls={[
                     {
                         controlEvents: [
                             {
                                 eventName: "statechange",
                                 callback: ({ chartWrapper, controlWrapper }) => {
                                     console.log("State changed to", controlWrapper?.getState());
                                 },
                             },
                         ],
                         controlType: "CategoryFilter",
 
                         options: {
                             
                             filterColumnIndex: 1,
                             ui: {
                                 caption:"Eventos...",
                                 labelStacking: "vertical",
                                 label: "Lista:",
                                 className:"form-select",
                                 allowTyping: false,
                                 allowMultiple: false,
                             },
                         },
                     },
                 ]}*/
                width={"100%"}
                height={"360px"}
            />
        </ div>
    )
}