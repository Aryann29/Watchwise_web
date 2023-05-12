import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Row from "../components/Row";

const SearchResult = () => {
  const { state } = useLocation();
  const searchResults = state?.searchResults || [];
  const [movieChunks, setMovieChunks] = useState([]);

  useEffect(() => {
    // divide the search results into chunks of 4 movies
    const chunks = [];
    for (let i = 0; i < searchResults.length; i += 4) {
      chunks.push(searchResults.slice(i, i + 4));
    }
    setMovieChunks(chunks);
  }, [searchResults]);

  return (
    <div className="bg-gray-900 h-screen">
      <h2 className="text-white font-bold md:text-xl px-14 pb-[10px] ml-7 pt-10 ">
        Search Results (found {searchResults.length} movies)
      </h2>

      {movieChunks.map((chunk, index) => (
        <Row key={index} movieIds={chunk.map((movie) => movie.id)} />
      ))}
    </div>
  );
};

export default SearchResult;
