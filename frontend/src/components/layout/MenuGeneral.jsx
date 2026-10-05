import { NavLink } from "react-router-dom";
import styles from "./MenuGeneral.module.css";

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V20h14V9.5" />
      <path d="M9 20v-6h6v6" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="5.5" />
      <path d="M16 16l5 5" />
    </svg>
  );
}

function FilmIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="M7.5 5.5V3.5M16.5 5.5V3.5M3.5 9.5H20.5M8 14.5h.01M12 14.5h.01M16 14.5h.01" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H20v15H6.5A2.5 2.5 0 0 0 4 21.5v-15Z" />
      <path d="M4 6.5V20M8 8h8M8 12h8" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.4l6.1-.9L12 3Z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="m10 8 6 4-6 4V8Z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8.5 12.5 2.5 2.5 4.5-5" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M10 8v8M14 8v8" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16M9 7V4h6v3M7 7l1 12h8l1-12" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 7h11M8 12h11M8 17h11M4 7h.01M4 12h.01M4 17h.01" />
    </svg>
  );
}

const mainLinks = [
  { to: "/", label: "Inicio", icon: <HomeIcon /> },
  { to: "/busqueda", label: "Busqueda", icon: <SearchIcon /> },
  { to: "/anime", label: "Anime", icon: <FilmIcon /> },
  { to: "/manga", label: "Manga", icon: <BookIcon /> },
];

const personalLinks = [
  { label: "Mi Lista", icon: <StarIcon /> },
  { label: "Viendo", icon: <PlayIcon /> },
  { label: "Completados", icon: <CheckIcon /> },
  { label: "En pausa", icon: <PauseIcon /> },
  { label: "Desechados", icon: <TrashIcon /> },
  { label: "Planeo ver", icon: <ListIcon /> },
];

function MenuGeneral({ isLoggedIn = false }) {
  return (
    <aside className={styles.menu}>
      <nav className={styles.nav} aria-label="Menú principal">
        {mainLinks.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
          >
            <span className={styles.icon} aria-hidden="true">{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {isLoggedIn && (
        <>
          <div className={styles.divider} aria-hidden="true" />

          <div className={styles.userSection}>
            {personalLinks.map(({ label, icon }) => (
              <NavLink
                key={label}
                to="/"
                className={({ isActive }) =>
                  `${styles.userLink} ${isActive ? styles.active : ""}`
                }
              >
                <span className={styles.icon} aria-hidden="true">{icon}</span>
                <span>{label}</span>
              </NavLink>
            ))}
          </div>
        </>
      )}
    </aside>
  );
}

export default MenuGeneral;
