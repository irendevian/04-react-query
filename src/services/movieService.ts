import axios from "axios";
import type { Movie } from "../types/movie";

const myToken = import.meta.env.VITE_API_TOKEN;


interface SearchMovieResponse {
    results: Movie[],
    page?: number
}

async function fetchMovies(searchValue: string): Promise<Movie[]> {
    try {   
        const res = await axios.get<SearchMovieResponse>(
            "https://api.themoviedb.org/3/search/movie", {
            params: {
               query: searchValue,
               include_adult: false,
               language: "en-US",
               page: 1,

            },
                headers: {
                Authorization: `Bearer ${myToken}`,
            }
        }
        );

        console.log(res.data.results);
        return res.data.results;
        
} catch (error) {
        console.error(error);
        throw new Error;
}
}

export default fetchMovies;