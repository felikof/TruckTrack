import React from "react";
import { Chart } from "react-google-charts";

const data = [
    ["Zone", "Quantity of Trucks"],
    ["North", 11],
    ["South", 7],
    ["East", 5],
    ["West", 3],
];

const options = {
    title: "Distribution of trucks by zone",
    pieHole: 0.4, // Pour un camembert creux (donut)
    is3D: true,
    backgroundColor: "#ffffffff",
    legend: { textStyle: { color: "#6792ffff", fontSize: 14 } },
    titleTextStyle: { color: "#060b2fff", fontSize: 24, fontWeight: "none"  },
    slices: {
        0: { color: "#00bcd4" },
        1: { color: "#8bc34a" },
        2: { color: "#ff9800" },
        3: { color: "#e91e63" },
    },
};

const PieChart = () => {
    return (
        <div style={{ position: "relative", width: "50%", marginTop: "-350px", marginLeft: "560px"}}>
            <Chart
                chartType="PieChart"
                width="100%"
                height="350px"
                border="50px"
                data={data}
                options={options}
            />
        </div>
    );
};

export default PieChart;
