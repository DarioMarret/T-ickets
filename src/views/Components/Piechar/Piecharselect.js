import { useEffect } from "react"
import { Chart } from "react-google-charts"
export default function PiecharViewsSlect({ ...props }) {


    return (
        <>
            <Chart
                chartType="PieChart"
                data={props.datas}
                options={{
                   
                    chartArea: { left: 15, top: 15, right: 0, bottom: 0 },
                    pieSliceText: "label",
                }}
                chartPackages={["corechart", "controls"]}
                chartWrapperParams={{ view: { columns: [0, 2] } }}
                controls={[
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
                ]}
                width={"auto"}
                height={"400px"}
            />
        </>
    )
}