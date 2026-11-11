import CarruselImagenes from "../components/layout/CarruselImagenes";
import MiniCard from "../components/layout/MiniCard";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {
  return (
    <div>

      <main className={styles.main}>

        <CarruselImagenes />
        <div className={styles.linea}>
          <p className={styles.titulo}>Temporada actual</p>
          <Link className={styles.verTodo} to="/anime">
            Ver todo
          </Link>
        </div>
        <MiniCard />
        <h1>Ya vamos a ver para que sirve esto</h1>
        <p>Todavia no se que poner aca XP</p>
      </main>
    </div>
  );
}



export default Home;