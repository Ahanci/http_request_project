import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://swapi.dev/api/film/');
      if(!response.ok){
        throw new Error('Something went wrong...')
      } // Bu eğer json() un altında olursa Unexpected token {'<', " <!DOCTYPE "... is not valid JSON} böyle bir hata verdi yani gelmeyen veriyi json a dönüştürmek istiyor.
      const data = await response.json();
      
      
      const transformedMovie = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,

        };

      });
      setMovies(transformedMovie);
      setIsLoading(false);

    }
    catch (error){
      setError(error.message);
      setIsLoading(false);
    }   

  }

  let content= <p> Found No Movies</p>
  if(movies.length>0){
    content = <MoviesList movies={movies}/>
  }
  if(isLoading){
    content = <p> Loading Your Films...</p>
  }
  if(error){
    content = <p>{error}</p>
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section> {content}       
      </section>
    </React.Fragment>
  );
}

export default App;






