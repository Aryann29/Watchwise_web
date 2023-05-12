import React from 'react'
import Row from '../components/Row'
import Navbar from '../components/Navbar'

import Footer from '../components/Footer'

const SciFi = [
  27205, // Inception (2010)
  244786, // Predestination (2014)
  329865, // Arrival (2016)
  603, // The Matrix (1999)
  78, // Blade Runner (1982)
  157336, // Interstellar (2014)
  218, // The Terminator (1984)
  10681, // The Day the Earth Stood Still (1951)
  62 // 2001: A Space Odyssey (1968)
];

const Toprated = [238, 278, 240, 424, 19404, 389, 496243, 155, 13];

const OscarWinning = [522, 680, 424, 129, 120, 769, 122, 496243, 108,238,121];
const Horror = [7345, 11287, 399360, 122, 496243, 813, 244786, 550, 289, 109428, 9277];
const Action = [111, 155, 238, 389, 424, 601, 680, 778, 858];

const Homepage = () => {
  return (
    <>
     <Navbar />
     <div className='h-10 bg-gray-900'></div>
     <Row title={"Top Rated"} movieIds={Toprated.map((movie) => movie)} />
     <Row title={"Science_fiction"} movieIds={SciFi.map((movie) => movie)} />
     <Row title={"Ocsar Winning"} movieIds={OscarWinning.map((movie) => movie)} />
     <Row title={"Action"} movieIds={Action.map((movie) => movie)} />
     <Row title={"Horror"} movieIds={Horror.map((movie) => movie)} />
     <Footer/>

     {/* <Recommendations titleHead={'Recommendations'} movieName="avatar"/> */}
    
    </>
    
  )
}

export default Homepage