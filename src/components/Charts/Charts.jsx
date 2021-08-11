import React from 'react';
import { Line } from "react-chartjs-2";


const Charts = ({ data }) => {
    const opts = {
        type: 'line',
        tooltips: {
            intersect: false
        },
        interaction: {
            intersect: false
        },
        responsive: true,
        maintainAspectRatio: true
    };
    return <Line data={data} options={opts} />;
};

export default Charts;