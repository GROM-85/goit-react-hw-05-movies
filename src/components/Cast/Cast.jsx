import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetail, END_POINTS } from 'utils/ApiService/ApiService';

const Cast = () => {
  const[cast,setCast] = useState([]);
  const {id} = useParams();

  const fetchCast = async() =>{
    try {
      const {cast} = await getMovieDetail({ searchBy:END_POINTS.credit, id: id });
      console.log('Cast',cast);
      setCast(cast);
    } catch (error) {
      console(error?.message);
    }
  };

  useEffect(() => {
    fetchCast();
    // eslint-disable-next-line
  },[id])
  
  return (
   
      <ul style={{display:'flex',gap:'30px'}}>
        {cast.length !== 0 &&
          cast.map(({name,profile_path,id}) => (
            <li key={id}>
              <img  width='50px' src={`https://image.tmdb.org/t/p/original/${profile_path}`} alt={name} />
              <p>{name}</p>
            </li>
          ))
        }
      </ul>
  
  );
};

export default Cast;