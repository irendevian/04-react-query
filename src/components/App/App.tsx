import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { useQuery } from '@tanstack/react-query';
import './App.module.css'
import type { Movie } from '../../types/movie';
import fetchMovies from '../../services/movieService';
import toast, { Toaster } from 'react-hot-toast';
import MovieGrid from '../MovieGrid/MovieGrid';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import MovieModal from '../MovieModal/MovieModal';
  

function App() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedMovie, setSelectedMovie] = useState<Movie|null>(null);

  const handleSearch = (searchValue: string) => {
    console.log("vulue", searchValue);
    if (!searchValue.trim()) {
      toast.error("Please enter a movie name!");
      return;
    }
    setSearchValue(searchValue);
  };

 const { data: movies = [], isLoading, isError } = useQuery({
    queryKey: ['movie', searchValue],
    queryFn: () => fetchMovies(searchValue),
    enabled: Boolean(searchValue),
 })
  
   const closeModal = () => setSelectedMovie(null);

   return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader /> }
      {isError && <ErrorMessage /> }
      {movies.length > 0 ? <MovieGrid movies={movies} onSelect={(movie) => setSelectedMovie(movie)}/> : null}
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={closeModal}/>}
      <Toaster position='top-center' />
          </>
  );
}

export default App;
