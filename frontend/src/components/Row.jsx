import { useEffect,useState } from 'react';

import Moviecardhome from "./Moviecardhome";


const Row = ({ title, movieIds }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      
      const apiKey = process.env.REACT_APP_YOUR_API_KEY;
     
      const promises = movieIds.map(movieId => {
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;
        return fetch(url).then(response => response.json());
      });
      const results = await Promise.all(promises);
      setMovies(results);
      
    }

    fetchData().catch(error => console.error(error));
  }, [movieIds]);
 

  return (
    <div className='bg-gray-900 py-5 px-8'>
      <h2 className='text-white font-bold md:text-xl px-14 pb-[10px] '>{title}</h2>
      <div className='flex items-center group'>
        <div className='relative w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide md:ml-9'>
          {movies.map(movie => <Moviecardhome key={movie.id} item={movie} />)}
        </div>
      </div>
    </div>
  );
};

export default Row;
