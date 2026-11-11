import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./AnimeDetail.module.css";

function AnimeDetail() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const animeId = Number(id);

    setAnime(null);
    setError("");

    if (!Number.isInteger(animeId) || animeId <= 0) {
      setError("El identificador de la serie no es válido.");
      return () => {
        active = false;
      };
    }

    const cargarAnime = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/anime/${animeId}`);
        const animeEncontrado = response.data?.data?.Media;

        if (!animeEncontrado) {
          throw new Error("No se encontró la información de esta serie.");
        }

        if (active) setAnime(animeEncontrado);
      } catch (error) {
        console.error("Error al obtener el detalle del anime:", error);
        if (active) {
          setError("No se pudo cargar la información de esta serie.");
        }
      }
    };

    cargarAnime();

    return () => {
      active = false;
    };
  }, [id]);

  if (error) {
    return (
      <section className={styles.detalle}>
        <p role="alert">{error}</p>
        <Link to="/anime">Volver a anime</Link>
      </section>
    );
  }

  if (!anime) {
    return <p className={styles.estado}>Cargando serie...</p>;
  }

  return (
    <article className={styles.detalle}>
      <Link className={styles.volver} to="/">
        Volver a home
      </Link>
      <div className={styles.contenido}>
        <img
          className={styles.portada}
          src={anime.coverImage?.large}
          alt={`Portada de ${anime.title?.romaji ?? "la serie"}`}
        />
        <div className={styles.informacion}>
          <h1>{anime.title?.romaji ?? "Serie sin título"}</h1>
          {anime.title?.english && <p>{anime.title.english}</p>}
          <p>
            <strong>Estado:</strong> {anime.status ?? "No disponible"}
          </p>
          <p>
            <strong>Episodios:</strong> {anime.episodes ?? "No disponible"}
          </p>
          <p>
            <strong>Puntuación:</strong> {anime.averageScore ?? "No disponible"}
          </p>
          {anime.genres?.length > 0 && (
            <p>
              <strong>Géneros:</strong> {anime.genres.join(", ")}
            </p>
          )}
          {anime.description && (
            <p className={styles.descripcion}>{anime.description}</p>
          )}
        </div>
      </div>
    </article>
  );
}

export default AnimeDetail;