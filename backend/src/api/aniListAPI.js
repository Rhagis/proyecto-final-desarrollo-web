//obtener datos de la api de anilist para obtener los animes de la api de anilist
import axios from "axios";

const BASE_URL = "https://graphql.anilist.co";

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
    console.error('Error fetching anime list:', error);
}
};
    
const getMangaList = async (page = 2, perPage = 10) => {
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
    }
};

export { getAnimeList, getMangaList };