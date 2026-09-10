import { joinClassNames} from "../../../utils/joinClassNames.js";
import styles from "./FilterChip.module.css"

const FilterChip = ({ label, selected, onClick }) => {
    return (
        <button
            type="button"
            className={joinClassNames(styles.chip, selected ? styles.selected : styles.unselected)}
            onClick={onClick}
            aria-pressed={selected}
        >
            {label}
        </button>
    )
}
export default FilterChip