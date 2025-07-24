import { useState } from "react";
import "./planner.css";

const monthNames = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

const weekdays = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];
const Planner = () => {
  const [month, setMonth] = useState(8);
  const [year, setYear] = useState(2025);

  const handlePreviousMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((prevYear) => prevYear - 1);
    } else {
      setMonth((prevMonth) => prevMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((prevYear) => prevYear + 1);
    } else {
      setMonth((prevMonth) => prevMonth + 1);
    }
  };

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const offsetDays = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const dayCells = Array.from({ length: daysInMonth }, (_, i) => ({
    id: `day-${year}-${month + 1}-${i + 1}`,
    label: i + 1,
  }));

  const emptyCells = Array.from({ length: offsetDays }, (_, i) => ({
    id: `empty-${year}-${month + 1}-${i}`,
  }));

  return (
    <main className="calendar">
      <header className="month-header">
        <button
          type="button"
          onClick={handlePreviousMonth}
          aria-label="Previous month"
        >
          ◀
        </button>
        <h1>
          {monthNames[month]} {year}
        </h1>
        <button type="button" onClick={handleNextMonth} aria-label="Next month">
          ▶
        </button>
      </header>

      <section className="calendar-grid">
        {weekdays.map((day) => (
          <span key={`weekday-${day}`} className="weekday-label">
            {day}
          </span>
        ))}
        {emptyCells.map((cell) => (
          <article key={cell.id} className="day-cell empty" />
        ))}
        {dayCells.map((day) => (
          <article key={day.id} className="day-cell">
            {day.label}
          </article>
        ))}
      </section>
    </main>
  );
};

export default Planner;
