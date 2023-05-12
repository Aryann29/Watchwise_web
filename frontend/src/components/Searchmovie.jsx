import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate} from 'react-router-dom';
import Papa from 'papaparse';
import searchIcon from '../assets/search.png';

const Searchmovie = ({ placeholder = 'Search for movies or TV series', searchPath }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  // const [searchResults, setSearchResults] = useState([]);
  
  const navigate = useNavigate();
 
  
  const searchRef = useRef(null);
  const suggestionRef = useRef(null);

  useEffect(() => {
    fetch('/watchwise/movies.csv')
      .then((response) => response.text())
      .then((csv) => {
        const results = Papa.parse(csv, { 
          header: true, 
          skipEmptyLines: true, 
          transformHeader: (header) => header.toLowerCase(), 
          transform: (value, header) => (header === 'tags' ? undefined : value) 
        });
        const dataWithIds = results.data.map((item) => ({ ...item, id: item.id }));
        setSuggestions(dataWithIds);

      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target) && suggestionRef.current && !suggestionRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [searchRef]);

  useEffect(() => {
    if (selectedMovieId !== null) {
      navigate(`/watchwise/mdetails/${selectedMovieId}`);
      setSelectedMovieId(null);
    }
  }, [selectedMovieId, navigate]);

  const filteredSuggestions = useMemo(() => {
    if (query.length === 0) {
      return [];
    }
    const lowerCaseQuery = query.toLowerCase();
    return suggestions.filter((suggestion) => {
      const title = suggestion.title.toLowerCase();
      return title.includes(lowerCaseQuery);
    }).slice(0, 6);
  }, [query, suggestions]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.length === 0) {
      return;
    }
    const lowerCaseQuery = query.toLowerCase();
    const filteredResults = suggestions.filter((suggestion) => suggestion.title.toLowerCase().includes(lowerCaseQuery)).slice(0, 16);
    navigate(`/watchwise/search?query=${query}&results=${filteredResults.length}`, { state: { searchResults: filteredResults } });
  };
  
  
  const handleSuggestionClick = (suggestion) => {
    setSelectedMovieId(suggestion.id);
  };
  

  return (
    <form onSubmit={handleSearch} className='w-full md:w-2/4'>
    <div className='flex items-center justify-between w-full'>
      <input
        className='  md:block md:w-full rounded ml-16 md:rounded-md border-b h-7 md:h-10 border-app-dark-blue p-2 bg-app-dark-blue pb-[8px] text-base font-light caret-app-red placeholder:text-base placeholder:text-app-placeholder focus:border-b focus:border-app-greyish-blue focus:outline-none'
        type='text'
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      
      <button
        type='submit'
        className=' hidden text-capitalize  lg:flex items-center justify-center rounded-md bg-app-greyish-blue py-2 px-3 text-xs text-app-pure-white hover:bg-app-pure-white hover:text-app-dark-blue md:hidden'>
        <img src={searchIcon} alt='Search' className='h-6 w-6 md:h-8 md:w-9' />
      </button>
    </div>
    {filteredSuggestions.length > 0 && (
        <ul className='absolute left-[202px] w-[188px] lg:left-[420px] lg:w-[509px] rounded-md bg-white shadow-lg mt-1 z-10' ref={searchRef}>
          {filteredSuggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className='px-3 py-2 cursor-pointer hover:bg-gray-200'
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.title}
            </li>
          ))}
        </ul>
      )}
    
  </form>
  

  
  );
};

export default Searchmovie;