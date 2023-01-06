import React from "react";
import {
    ScatterChart,
    Scatter,
    YAxis,
    XAxis,
    CartesianGrid,
    Tooltip,
    LabelList,
    ZAxis
} from "recharts";

const Map = (props) => {
    console.log(props.data);
    const data = props.data;

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Map</h1>
            <div className="App">
                <ScatterChart className="scatterMap" width={2000} height={857}>
                    <CartesianGrid />
                    <ZAxis type="string" dataKey="name" />
                    <XAxis
                        type="number"
                        dataKey="geolocation.longitude"
                        domain={[-180, 180]}
                        name="x"
                    />
                    <YAxis
                        type="number"
                        dataKey="geolocation.latitude"
                        domain={[-90, 90]}
                        name="y"
                    />
                    <Scatter
                        data={data}
                        line={{ stroke: "red", strokeWidth: 0 }}
                        fill="red"
                        shape="wye"
                    />
                    <LabelList dataKey="x" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                </ScatterChart>
            </div>
        </div>
    );
};

export default Map;
