import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import Recommendations from '../components/Recommendations';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [streamingProviders, setStreamingProviders] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      const apiKey = 'c32d9776cac91bca875c69eb1c3a31f1';
      const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;
      const response = await fetch(url);
      const data = await response.json();
      setMovie(data);
    }

    async function fetchStreamingProviders() {
      const apiKey = 'c32d9776cac91bca875c69eb1c3a31f1';
      const url = `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      setStreamingProviders(data.results);
      console.log(data.results)
    }

    fetchMovie().catch(error => console.error(error));
    fetchStreamingProviders().catch(error => console.error(error));
  }, [movieId]);

  if (!movie || !streamingProviders) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const { poster_path, title, overview, release_date, vote_average, genres, runtime } = movie;

  return (
    <>
      <div className="flex flex-col items-center bg-gray-900 pb-10">
        <div className="w-2/3 bg-gray-800 rounded-lg py-8 px-12 mt-12">
          <div className="flex flex-col md:flex-row items-center">
            <img className="w-1/2 md:w-1/4 rounded-lg mb-6 md:mb-0" src={`https://image.tmdb.org/t/p/w300/${poster_path}`} alt={`${title} poster`} />
            <div className="md:ml-8">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">{title}</h2>
              <div className="flex items-center text-gray-400 text-sm mb-2">
                <svg className="w-4 h-4 fill-current mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M19.899 7.453c-.647 0-1.247.257-1.697.706l-7.507 7.507-3.242-3.242a2.39 2.39 0 0 0-3.39 0 2.394 2.394 0 0 0 0 3.39l4.94 4.94a2.393 2.393 0 0 0 1.695.7 2.394 2.394 0 0 0 1.696-.7l8.202-8.203a2.394 2.394 0 0 0 0-3.393c-.45-.45-1.05-.706-1.696-.706zm-6.202 10.75l-4.94-4.94a.398.398 0 0 1 0-.562 1.193 1.193 0 0 1 1.684 0l2.94 2.94 7.507-7.506a1.193 1.193 0 0 1 1.683 1.684l-8.203 8.203z" />
                </svg>
                <span>{release_date}</span>
                <span className="mx-2">&bull;</span>
                <span>{`${(vote_average).toFixed(1)}`} / 10</span>
                <span className="mx-2">&bull;</span>
                <span>{runtime} min</span>
              </div>
              <p className="text-white text-sm">{overview}</p>
              <p className="text-white text-sm mt-2">
                {genres.map((genre, index) => (
                  <span
                    key={genre.id}
                    className={`${index > 0 ? "ml-2" : ""
                      } inline-block rounded-full py-1 px-3 font-medium bg-gray-700`}
                  >
                    {genre.name}
                  </span>
                ))}
              </p>
              <div className="text-white text-sm mt-2">
                {streamingProviders?.results?.IN?.flatrate?.map(provider => (
                  <span
                    key={provider.provider_id}
                    className="inline-block rounded-full py-1 px-3 font-medium bg-gray-700 mr-2 mb-2"
                  >
                    {provider.provider_name}
                  </span>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>

      <Recommendations titleHead={'Recommendations'} movieName={title} />



    </>


  );
};

export default MovieDetails;
