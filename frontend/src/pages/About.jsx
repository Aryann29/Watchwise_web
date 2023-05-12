import React from 'react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-4">About Me</h1>
      <h1 className="text-2xl font-bold mb-4">Hey this is <span className='text-red-500 text-3xl'>Aryan</span> here</h1>
      <p className="mb-4 font-sans ">I am a machine learning engineer, I'vecreated this website using the power of modern web technologies. I used ReactJS as the front-end framework, which allowed me to build a fast and responsive user interface. Additionally, I integrated Gradio API to provide a state-of-the-art recommendation system that suggests movies based on user preferences.</p>
      <p className="mb-4 font-sans"> Watchwise is more than just a movie database website; it's the ultimate destination for movie lovers. Our recommendation engine analyzes various user inputs such as ratings, genre preferences, and watch history to provide tailored suggestions. Whether you're in the mood for a classic drama or a sci-fi adventure, Watchwise has got you covered.</p>
    </div>
  );
};

export default About;
