import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import styles from "./DistributionChart.module.css"

ChartJS.register(ArcElement, Tooltip)

// Composant générique de répartition (donut + légende) -> réutilisé pour
// "Utilisateurs par niveau" et "Utilisateurs par statut" dans
// StatisticsPage, mais utilisable pour n'importe quelle répartition future.
const DistributionChart = ({ title, segments }) => {
    const data = {
        labels: segments.map((s) => s.label),
        datasets: [
            {
                data: segments.map((s) => s.value),
                backgroundColor: segments.map((s) => s.color),
                borderColor: '#10131f',
                borderWidth: 3,
            },
        ],
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '68%',
        // Délai avant que chart.js ne dessine le donut — sans ça, l'animation
        // du tracé se joue pendant que la carte est encore invisible (opacité 0
        // via notre cascade CSS d'entrée), donc jamais vue.
        animation: {
            delay: 500,
        },
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
    }

    return (
        <div className={styles.card}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.chartRow}>
                <div className={styles.chartWrapper}>
                    <Doughnut data={data} options={options} />
                </div>
                <div className={styles.legend}>
                    {segments.map((s) => (
                        <div key={s.label} className={styles.legendRow}>
                            <span className={styles.legendDot} style={{ background: s.color }} />
                            {s.label} — <span className={styles.legendValue}>{s.value}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default DistributionChart;