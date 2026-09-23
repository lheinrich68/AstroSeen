import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";

//? Génère une grille de 42 jours (6 semaines) couvrant le mois donné, avec
//  les jours des mois précédent/suivant en complément (semaine commençant
//  le lundi (weekStartsOn: 1), cohérent avec l'en-tête L M M J V S D).
export function getMonthGrid(date) {
    const firstDayOfMonth = startOfMonth(date);
    const lastDayOfMonth = endOfMonth(date);
    const gridStart = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 });
    const gridEnd = endOfWeek(lastDayOfMonth, { weekStartsOn: 1 });

    return eachDayOfInterval({ start: gridStart, end: gridEnd })
}