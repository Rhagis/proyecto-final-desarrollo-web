import { useState, useEffect, useRef } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="5.5" />
      <path d="M16 16l5 5" />
    </svg>
  );
}

function Navbar({ user, onOpenLogin, onOpenRegister }) {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("Todo");
  const [search, setSearch] = useState("");

  const wrapperRef = useRef(null);

  const handleToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      console.log({ search, category });
    }
  };

  return (
    <header className="navbar">
      <div className="navbar__left">
        <Link to="/" className="navbar__logoLink" aria-label="Ir al inicio">
          <h1 className="navbar__logo">Animanga</h1>
        </Link>
      </div>

      <div className="navbar__center">
        <div className={styles.search}>
          <select
            className={styles.category}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Todo</option>
            <option>Anime</option>
            <option>Manga</option>
            <option>Characters</option>
          </select>

          <input
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.input}
            onKeyDown={handleSearch}
          />

          <button
            type="button"
            className={styles.searchButton}
            onClick={() => console.log({ search, category })}
            aria-label="Buscar"
          >
            <SearchIcon />
          </button>
        </div>
      </div>

      <div className="navbar__right">
        {!user ? (
          <div className={`${styles.authActions} gap-sm`}>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onOpenLogin}
            >
              Login
            </button>

            <button
              type="button"
              className="btn btn-primary"
              onClick={onOpenRegister}
            >
              Registro
            </button>
          </div>
        ) : (
          <div className={styles.userWrapper} ref={wrapperRef}>
            <button
              className={styles.userMenu}
              onClick={handleToggle}
              aria-expanded={open}
            >
              <span>{user.name}</span>
            </button>

            {open && (
              <div className={styles.dropdown}>
                <Link to="/profile" className="btn btn-ghost">
                  Perfil
                </Link>
                <Link to="/logout" className="btn btn-ghost">
                  Cerrar sesión
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
