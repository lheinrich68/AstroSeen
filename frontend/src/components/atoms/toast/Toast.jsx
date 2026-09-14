import { CheckCircle2, XCircle, Info, AlertTriangle } from "lucide-react";
import styles from "./Toast.module.css";

const CONFIG = {
    success: { icon: CheckCircle2, color: 'var(--color-accent-signal)' },
    error: { icon: XCircle, color: 'var(--color-danger)' },
    warning: { icon: AlertTriangle, color: 'var(--color-accent-starlight)' },
    info: { icon: Info, color: 'var(--color-text-muted)' },
}

const Toast = ({ variant = "info", message }) => {
    const { icon: Icon, color } = CONFIG[variant];

    return (
        <div className={styles.toast}>
            <Icon size={18} color={color} className={styles.icon} />
            <span className={styles.message}>{message}</span>
        </div>
    )
}
export default Toast;