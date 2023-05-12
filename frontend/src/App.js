import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Chatbot from './components/Chatbot';
import MovieDetails from './pages/MovieDetails'
import Homepage from './pages/Homepage';
import SearchResults from './pages/SearchResults';
import Contact from './pages/Contact';
import About from './pages/About';
import { useEffect } from 'react';
import Kommunicate from '@kommunicate/kommunicate-chatbot-plugin';

Kommunicate.init("2b4e6187162a823ca4af3f17b64ea0ea4" )
function App() {


  return (
    <div>
      <BrowserRouter>
      
      <Routes>
    
      <Route path="/watchwise" element={<Homepage />} />
      <Route path='/watchwise/search'  element={<SearchResults/>}  />
      <Route path="/watchwise/mdetails/:movieId" element={<MovieDetails />} />
      <Route path="/watchwise/about" element={<About />} />
      <Route path="/watchwise/contact" element={<Contact />} />
      {/* <Route path="/watchwise/chatbot" element={<Chatbot />} /> */}
   
     </Routes>

   </BrowserRouter>
      

      
    </div>
  );
}


export default App;



