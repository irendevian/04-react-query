import axios from "axios";
import type { Movie } from "../types/movie";

const myToken = import.meta.env.VITE_API_TOKEN;


interface SearchMovieResponse {
    results: Movie[],
    total_pages: number,
}

async function fetchMovies(searchValue: string, page: number): Promise<SearchMovieResponse> {
    try {   
        const res = await axios.get<SearchMovieResponse>(
            "https://api.themoviedb.org/3/search/movie", {
            params: {
               query: searchValue,
               include_adult: false,
               language: "en-US",
               page,

            },
                headers: {
                Authorization: `Bearer ${myToken}`,
            }
        }
        );

        console.log(res.data);
        return res.data;
        
} catch (error) {
        console.error(error);
        throw new Error;
}
}

export default fetchMovies;