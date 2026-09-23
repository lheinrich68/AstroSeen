import { format, isSameMonth, isSameDay, isToday } from "date-fns";
import { fr } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getMonthGrid } from "../../../utils/calendarGrid.js";
import { EVENT_TYPES, SESSION_COLOR} from "../../../utils/eventTypes.js";
import { joinClassNames } from "../../../utils/joinClassNames.js";
import styles from "./MonthCalendar.module.css";

const WEEKDAYS_SHORT = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
const WEEKDAYS_FULL = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

function colorForEvent(event) {
    if (event.type === 'session') return SESSION_COLOR
    return EVENT_TYPES[event.type]?.color ?? EVENT_TYPES.other.color
}

const MonthCalendar = ({ currentMonth, selectedDate, events, onMonthChange, onSelectDate}) => {
    const days = getMonthGrid(currentMonth)
    const eventsForDay = (day) => events.filter((e) => isSameDay(e.date, day))

    return (
        <div className={styles.card}>
            <div className={styles.headerRow}>
                <button
                    type="button"
                    className={styles.navButton}
                    onClick={() => onMonthChange(-1)}
                    aria-label="Mois précédent"
                >
                    <ChevronLeft size={18} />
                </button>
                <span className={styles.monthLabel}>{format(currentMonth, 'MMMM yyyy', { locale: fr })}</span>
                <button
                    type="button"
                    className={styles.navButton}
                    onClick={() => onMonthChange(1)}
                    aria-label="Mois suivant"
                >
                    <ChevronRight size={18} />
                </button>
            </div>

            <div className={styles.weekdaysRow}>
                {WEEKDAYS_SHORT.map((w, i) => (
                    <span key={i} className={styles.weekday}>
            <span className={styles.weekdayShort}>{w}</span>
            <span className={styles.weekdayFull}>{WEEKDAYS_FULL[i]}</span>
          </span>
                ))}
            </div>

            <div className={styles.daysGrid}>
                {days.map((day) => {
                    const dayEvents = eventsForDay(day)
                    // Un point par couleur distincte présente ce jour-là (pas un point
                    // par événement) => évite de surcharger une cellule si plusieurs
                    // événements du même sous-type tombent le même jour.
                    const distinctColors = [...new Set(dayEvents.map(colorForEvent))]

                    return (
                        <button
                            key={day.toISOString()}
                            type="button"
                            className={joinClassNames(
                                styles.dayCell,
                                !isSameMonth(day, currentMonth) && styles.dayOutsideMonth,
                                isSameDay(day, selectedDate) && styles.daySelected,
                                isToday(day) && styles.dayToday,
                            )}
                            onClick={() => onSelectDate(day)}
                        >
                            {format(day, 'd')}
                            <span className={styles.dotsRow}>
                                {distinctColors.map((color) => (
                                    <span key={color} className={styles.dot} style={{ background: color }} />
                                ))}
                            </span>
                        </button>
                    )
                })}
            </div>

            <div className={styles.legendRow}>
                {Object.entries(EVENT_TYPES).map(([key, { label, color }]) => (
                    <span key={key} className={styles.legendItem}>
                        <span className={styles.dot} style={{ background: color }} />
                        {label}
                    </span>
                ))}
                <span className={styles.legendItem}>
                <span className={styles.dot} style={{ background: SESSION_COLOR }} />
                    Session
                </span>
            </div>
        </div>
    )
}
export default MonthCalendar