import { useRef } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler,
} from "chart.js";
import styles from "./UsersGrowthChart.module.css"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

//* PAS ENCORE branché à un backend => données de démonstration en dur.
//TODO: À remplacer par un vrai appel API (GET /admin/stats/users-growth) une fois
//      l'endpoint disponible.

//? Couleurs codées en dur (pas de var(--...) CSS) : chart.js dessine sur un
//  <canvas>, qui ne peut pas résoudre les variables CSS custom au moment du
//  tracé -> il faut lui passer des valeurs de couleur concrètes.

const MOCK_DATA = {
    labels: ['Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre'],
    values: [812, 940, 1024, 1108, 1195, 1284],
}

const SIGNAL_COLOR = '#4fd8e0'
const MUTED_COLOR = '#8b93a7'

const UsersGrowthChart = () => {
    const chartRef = useRef(null)

    const data = {
        labels: MOCK_DATA.labels,
        datasets: [
            {
                label: 'Utilisateurs actifs',
                data: MOCK_DATA.values,
                borderColor: SIGNAL_COLOR,
                backgroundColor: (context) => {
                    const chart = context.chart
                    const { ctx, chartArea } = chart
                    if (!chartArea) return null
                    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
                    gradient.addColorStop(0, 'rgba(79, 216, 224, 0.25)')
                    gradient.addColorStop(1, 'rgba(79, 216, 224, 0)')
                    return gradient
                },
                fill: true,
                tension: 0.35,
                pointRadius: 3,
                pointBackgroundColor: SIGNAL_COLOR,
                pointBorderColor: '#06070c',
                pointBorderWidth: 2,
            },
        ],
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#171b2c',
                titleColor: '#e7e9f0',
                bodyColor: '#e7e9f0',
                borderColor: 'rgba(139, 147, 167, 0.2)',
                borderWidth: 1,
                padding: 10,
            },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: MUTED_COLOR, font: { size: 11 } },
            },
            y: {
                grid: { color: 'rgba(139, 147, 167, 0.1)' },
                ticks: { color: MUTED_COLOR, font: { size: 11 } },
            },
        },
    }

    return (
        <div className={styles.card}>
            <h2 className={styles.title}>Nouveaux utilisateurs (6 derniers mois)</h2>
            <div className={styles.chartWrapper}>
                <Line ref={chartRef} data={data} options={options} />
            </div>
        </div>
    )
}
export default UsersGrowthChart