//obtener datos de la api de anilist para obtener los animes de la api de anilist
import axios from "axios";

const BASE_URL = "https://graphql.anilist.co";

const getNextSeason = () => {
            const fecha = new Date();
            const mes = fecha.getMonth() + 1;
            const año = fecha.getFullYear();

            // AniList:
            // WINTER = enero-marzo
            // SPRING = abril-junio
            // SUMMER = julio-septiembre
            // FALL = octubre-diciembre

            if (mes >= 1 && mes <= 3) {
                return {
                    season: 'SPRING',
                    year: año
                };
            }

            if (mes >= 4 && mes <= 6) {
                return {
                    season: 'SUMMER',
                    year: año
                };
            }

            if (mes >= 7 && mes <= 9) {
                return {
                    season: 'FALL',
                    year: año
                };
            }

            // Si estamos en octubre, noviembre o diciembre,
            // la próxima temporada es invierno del año siguiente.
            return {
                season: 'WINTER',
                year: año + 1
            };
        };

const currentSeason = () => {
    const fecha = new Date();
    const mes = fecha.getMonth() + 1;
    const año = fecha.getFullYear();

    if (mes >= 1 && mes <= 3) {
        return {
            season: 'WINTER',
            year: año
        };
    }

    if (mes >= 4 && mes <= 6) {
        return {
            season: 'SPRING',
            year: año
        };
    }

    if (mes >= 7 && mes <= 9) {
        return {
            season: 'SUMMER',
            year: año
        };
    }

    return {
        season: 'FALL',
        year: año
    };
};

const getAnimeList = async (page = 1, perPage = 10) => {
try {
    const query = `
    query ($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
            media(type: ANIME) {
                id
                title {
                    romaji
                    english
                    native
                }
                coverImage {
                    large
                }
                genres
                averageScore
                popularity
          }
        }
    }
    `;

    const variables = {
        page: Number(page),
        perPage: Number(perPage)
    };

    const response = await axios.post(BASE_URL, {
        query,
        variables
    });
    return response.data;
}
catch(error){
    console.error('Error fetching anime list:', error);
    throw error;
}
};

const getAnimeBanner = async (page = 1, perPage = 5) => {
    const { season, year } = getNextSeason();
    try {
        const query = `
        query ($page: Int, $perPage: Int,$season:MediaSeason, $seasonYear: Int) {
            Page(page: $page, perPage: $perPage) {
                media(type: ANIME
                        sort: POPULARITY_DESC
                        season: $season
                        seasonYear: $seasonYear
                        ) {
                    id
                    title {
                        romaji
                        english
                        native
                    }
                    bannerImage
                    coverImage {
                        large
                    }
                    genres
                    description
                    season
                    seasonYear
                }
            }
        }
        `;

        
        const variables = {
            page: Number(page),
            perPage: Number(perPage),
            season,
            seasonYear: year
        };

        const response = await axios.post(BASE_URL, {
            query,
            variables
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching anime banner:', error);
        throw error;
    }
};

const getAnimeCurrentSeason = async (page = 1, perPage = 50) => {
    const { season, year } = currentSeason();
    try {
        const query = `
        query ($page: Int, $perPage: Int,$season:MediaSeason, $seasonYear: Int) {
            Page(page: $page, perPage: $perPage) {
                media(type: ANIME
                        sort: POPULARITY_DESC
                        season: $season
                        seasonYear: $seasonYear
                        ) {
                    id
                    title {
                        romaji
                        english
                        native
                    }
                    coverImage {
                        large
                    }
                    season
                    seasonYear
                }
            }
        }
        `;

        const variables = {
            page: Number(page),
            perPage: Number(perPage),
            season,
            seasonYear: year
        };

        const response = await axios.post(BASE_URL, {
            query,
            variables
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching anime current season:', error);
        throw error;
    }
};

const getAnimeById = async (id) => {
    try {
        const query = `
        query ($id: Int) {
            Media(id: $id, type: ANIME) {
                id
                title {
                    romaji
                    english
                    native
                }
                description
                coverImage {
                    large
                }
                genres
                averageScore
                episodes
                status
                bannerImage
                popularity
                startDate {
                    year
                    month
                    day
                }
                endDate {
                    year
                    month
                    day
                }
                relations {
                    edges {
                        node {
                            id
                            title {
                                romaji
                                english
                                native
                            }
                            coverImage {
                                large
                            }
                        }
                    }
                }
                staff {
                    edges {
                        node {
                            name {
                                full
                            }
                        }
                    }
                }
                characters {
                    edges {
                        node {
                            name {
                                full
                            }
                        }
                    }
                }
            }
        }
        `;
        const variables = { id };
        const response = await axios.post(BASE_URL, {
            query,
            variables
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching anime by ID:', error);
        throw error;
    }
};
const getMangaList = async (page = 1, perPage = 10) => {
    try {
        const query = `
        query ($page: Int, $perPage: Int) {
            Page(page: $page, perPage: $perPage) {
                media(type: MANGA) {
                    id
                    title {
                        romaji
                        english
                        native
                    }
                    coverImage {
                        large
                    }
                    genres
                    averageScore
                    popularity
                }
            }
        }
        `;

        const variables = {
            page: Number(page),
            perPage: Number(perPage)
        };

        const response = await axios.post(BASE_URL, {
            query,
            variables
        });
        console.log(response.data);
        return response.data;
    }
    catch(error){
        console.error('Error fetching manga list:', error);
        throw error;
    }
};

const getMangaById = async (id) => {
    try {
        const query = `
        query ($id: Int) {
            Media(id: $id, type: MANGA) {
                id
                title {
                    romaji
                    english
                    native
                }
                description
                coverImage {
                    large
                }
                genres
                averageScore
                chapters
                volumes
                status
                bannerImage
                popularity
                startDate {
                    year
                    month
                    day
                }
                endDate {
                    year
                    month
                    day
                }
                relations {
                    edges {
                        node {
                            id
                            title {
                                romaji
                                english
                                native
                            }
                            coverImage {
                                large
                            }
                        }
                    }
                }
                staff {
                    edges {
                        node {
                            name {
                                full
                            }
                        }
                    }
                }
                characters {
                    edges {
                        node {
                            name {
                                full
                            }
                        }
                    }
                }
            }
        }
        `;
        const variables = { id };
        const response = await axios.post(BASE_URL, {
            query,
            variables
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching manga by ID:', error);
        throw error;
    }
};

export { getAnimeList, getAnimeBanner, getAnimeCurrentSeason, getMangaList, getAnimeById, getMangaById };