import { joinClassNames} from "../../../utils/joinClassNames.js";
import styles from "./Tabs.module.css"

const Tabs = ({ tabs, activeKey, onChange }) => {
    return (
        <div className={styles.tabs}>
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    type="button"
                    className={joinClassNames(styles.tab, activeKey === tab.key && styles.tabActive)}
                    onClick={() => onChange(tab.key)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    )
}
export default Tabs;