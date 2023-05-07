import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetail, END_POINTS } from 'utils/ApiService/ApiService';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Reviews = () => {
  const[reviews,setReviews] = useState([]);
  const [expanded,setExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {id} = useParams();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const fetchReviews = async() =>{
    setIsLoading(true);
    try {
      const {results} = await getMovieDetail({ searchBy: END_POINTS.review,id: id });
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
    <div>
        <Typography variant='h6'sx={{fontWeight:700}}> Comments</Typography>
        {reviews.length !== 0 ? (
         <>
            {reviews.map(({ author, content },idx) => (
             
              <Accordion
              key={idx}
              expanded={expanded === idx.toString()}
              onChange={handleChange(idx.toString())}
              sx={{bgcolor:'#4b4c4d',color:'white'}}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{fill:'white'}}/>}
                aria-controls="panel1bh-content"
              >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  {author}
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                  <Typography>
                    {content}
                  </Typography>
                </AccordionDetails>
                </Accordion>
                
            ))}
          </>
        ) : (
          !isLoading && <div>There are no reviews found!</div>
        )}
      
    </div>
  );
};
export default Reviews;
