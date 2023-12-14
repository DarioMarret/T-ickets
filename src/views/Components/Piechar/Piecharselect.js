import { useEffect } from "react"
import { Chart } from "react-google-charts"
export default function PiecharViewsSlect({ ...props }) {


    return (
        <>
            <Chart
                chartType="PieChart"
                data={props.datas}
                options={{
                    legend: "none",
                    chartArea: { left: 10, top: 18, right:10, bottom: 45 },
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
        </>
    )
}