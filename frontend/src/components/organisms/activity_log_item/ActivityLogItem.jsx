import styles from "./ActivityLogItem.module.css"

const ActivityLogItem = ({ icon: Icon, text, time }) => {
    return (
        <div className={styles.row}>
            <Icon size={13} className={styles.icon} />
            <span className={styles.text}>{text}</span>
            <span className={styles.time}>{time}</span>
        </div>
    )
}
export default ActivityLogItem