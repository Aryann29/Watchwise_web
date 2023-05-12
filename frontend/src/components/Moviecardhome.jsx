import { Link } from 'react-router-dom';

const Moviecardhome = ({ item }) => {
  return (
    <>
      <div className='relative inline-block h-44 w-72 mr-4 ml-2  overflow-x-hidden'>
        <Link to={`/watchwise/mdetails/${item.id}`}>
          <img
            className="rounded-md"
            src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
            alt={item?.title}
          />
          <div className="absolute bottom-0 left-0 w-full bg-black rounded-b-md ">
            <div className="w-full h-full flex flex-col justify-end p-2">
              <h3 className="text-white text-xs md:text-base whitespace-nowrap overflow-ellipsis">
                {item?.title}
              </h3>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Moviecardhome;

