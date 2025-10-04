import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { useQuery } from '@tanstack/react-query';
import css from './App.module.css'
import type { Movie } from '../../types/movie';
import fetchMovies from '../../services/movieService';
import toast, { Toaster } from 'react-hot-toast';
import MovieGrid from '../MovieGrid/MovieGrid';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import MovieModal from '../MovieModal/MovieModal';
import ReactPaginate from 'react-paginate';
  

function App() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedMovie, setSelectedMovie] = useState<Movie|null>(null);
  const [page, setPage] = useState(1);

  const handleSearch = (searchValue: string) => {
    if (!searchValue.trim()) {
      toast.error("Please enter a movie name!");
      return;
    }
    setSearchValue(searchValue);
  };

 const { data, isLoading, isError } = useQuery({
    queryKey: ['movie', searchValue, page],
    queryFn: () => fetchMovies(searchValue, page),
    enabled: Boolean(searchValue),
 })
  
  const closeModal = () => setSelectedMovie(null);
  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;


   return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader /> }
      {isError && <ErrorMessage /> }
      {movies.length > 0 ? <MovieGrid movies={movies} onSelect={(movie) => setSelectedMovie(movie)}/> : null}
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={closeModal} />}
      {totalPages > 1 && <ReactPaginate
         pageCount={totalPages}
         pageRangeDisplayed={5}
         marginPagesDisplayed={1}
         onPageChange={({ selected }) => setPage(selected + 1)}
         forcePage={page - 1}
         containerClassName={css.pagination}
         activeClassName={css.active}
         nextLabel="→"
         previousLabel="←"
       />} 
      <Toaster position='top-center' />
          </>
  );
}

export default App;
