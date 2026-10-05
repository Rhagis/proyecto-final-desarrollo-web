import styles from "./CarruselImagenes.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

function CarruselImagenes() {
  const [animes, setAnimes] = useState([]);
  const [indiceActual, setIndiceActual] = useState(0);

  const animeActual = animes[indiceActual];

  const siguienteAnime = () => {
    console.log("Índice actual:", indiceActual);
    console.log("Cantidad de animes:", animes.length);

    setIndiceActual((actual) => (actual + 1) % animes.length);
  };

  const anteriorAnime = () => {
    console.log("Índice actual:", indiceActual);
    console.log("Cantidad de animes:", animes.length);

    setIndiceActual((actual) => (actual - 1 + animes.length) % animes.length);
  };

  useEffect(() => {
    const cargarAnimes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/anime/banner",
        );
        setAnimes(response.data.data.Page.media);
        console.log(animes)
      } catch (error) {
        console.error("Error al obtener los animes:", error);
      }
    };
    cargarAnimes();
  }, []);

  //esto es para que cambien automaticamente las imagenes del carrusel
  useEffect(() => {
    if (animes.length === 0) return;

    const intervalo = setInterval(() => {
        setIndiceActual((actual) => (actual + 1) % animes.length);
    }, 5000);

    return () => clearInterval(intervalo);
  }, [animes]);

  return (
    <section className={styles.carrusel}>
      <div
        className={styles.carrusel_slide}
        style={{ backgroundImage: `url(${animeActual?.bannerImage})` }}
      >
        <div className={styles.carrusel_contenido}>
          <h3 className={styles.carrusel_nombre}>
            {animeActual?.title?.english}
          </h3>

          <p className={styles.carrusel_subtitulo}>
            {animeActual?.genres?.join(", ")}
          </p>

          <p className={styles.carrusel_descripcion}>
            {animeActual?.description}
          </p>

          <div className={styles.carrusel_acciones}>
            <button className="btn btn-primary">Ver Ahora</button>
            <button className="btn btn-ghost">Agregar a lista</button>
          </div>
        </div>
        <button className={styles.carrusel_anterior} onClick={anteriorAnime}>
          ←
        </button>
        <button className={styles.carrusel_siguiete} onClick={siguienteAnime}>
          →
        </button>
      </div>
    </section>
  );
}

export default CarruselImagenes;
