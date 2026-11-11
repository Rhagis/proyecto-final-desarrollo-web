import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./MiniCard.module.css";

function MiniCard() {
    const [animes, setAnimes] = useState([]);

    useEffect(() => {
        const cargarAnimes = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/anime/current-season"
                );
                setAnimes(response.data.data.Page.media);
            } catch (error) {
                console.error("Error al obtener los animes:", error);
            }
        };

        cargarAnimes();
    }, []);

    if (animes.length === 0) return null;

    return (
        <section className={styles.minicard}>
            {/*con el .map genero una card para cada serie recibida desde la API */}
            {animes.slice(0, 5).map((anime) => (
                <Link
                    className={styles.minicard_slide}
                    key={anime.id}
                    to={`/anime/${anime.id}`}
                    aria-label={`Ver detalles de ${anime.title?.romaji ?? "anime"}`}
                    style={{
                        backgroundImage: `url(${anime.coverImage?.large})`,
                    }}
                >
                    <div className={styles.minicard_contenido}>
                        <div className={styles.minicard_encabezado}>
                            <h3 className={styles.minicard_nombre}>
                                {anime.title?.romaji}
                            </h3>

                            <p className={styles.minicard_valoracion}>
                                ⭐{anime.averageScore}
                            </p>
                        </div>
                    </div>
                </Link>
            ))}
        </section>
    );
}

export default MiniCard;