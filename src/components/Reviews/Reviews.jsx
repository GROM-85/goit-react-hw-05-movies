import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetail, END_POINTS } from 'utils/ApiService/ApiService';

const Reviews = () => {
  const[reviews,setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {id} = useParams();

  const fetchReviews = async() =>{
    setIsLoading(true);
    try {
      const {results} = await getMovieDetail({ searchBy: END_POINTS.review,id: id });
      // console.log('Reviews',results);
      setReviews(results);
      setIsLoading(false);
    } catch (error) {
      console(error?.message);
    }
  };

  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line
  },[id])
  
  return (
    <>
     {reviews.length !== 0 ? (<ul>
      {reviews.map(({author, content})=>(
        <li>
          <h4>{author}</h4>
          <p>{content}</p>
        </li>
      ))}
      </ul>) : (!isLoading && <div>There are no reviews found!</div>)}
      </>
  );
};
export default Reviews;
