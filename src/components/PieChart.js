import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ positive, neutral, negative }) => {
    const data = {
        labels: ['Positifs', 'Neutres', 'Négatifs'],
        datasets: [
            {
                label: '% de Tweets',
                data: [positive, neutral, negative],
                backgroundColor: [
                    'rgba(102, 204, 102, 1)',
                    'rgba(76, 175, 221, 1)',
                    'rgba(255, 102, 102, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    const options = {
        responsive: true,
        animation: {
            duration: 0,
        },
    };

    return (
        <div style={{ width: '300px', margin: '4rem auto' }}>
            <h3 style={{ textAlign: 'center' }}>Répartition des sentiments</h3>
            <Pie data={data} options={options} />
        </div>
    );
};

export default PieChart;