import { useNavigate } from 'react-router-dom'
import Button from "../../atoms/button/Button.jsx";
import styles from "./ReportQueueCard.module.css"

const ReportsQueueCard = ({ report }) => {
    const navigate = useNavigate();

    return (
        <div className={styles.card}>
      <span className={styles.header}>
        {report.contentType} · {report.authorName}
      </span>
            <p className={styles.description}>{report.description}</p>

            <div className={styles.chipsRow}>
                {report.reasons.map((reason) => (
                    <span key={reason} className={styles.chip}>
            {reason}
          </span>
                ))}
            </div>

            <Button variant="outline" onClick={() => navigate(`/moderation/${report.id}`)}>
                Examiner
            </Button>
        </div>
    )
}
export default ReportsQueueCard;