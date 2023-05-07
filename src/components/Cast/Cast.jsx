import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetail, END_POINTS } from 'utils/ApiService/ApiService';
// import Carousel from 'react-bootstrap/Carousel';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Stack } from '@mui/system';
import { Card, Skeleton, Typography } from '@mui/material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useWindowSize } from 'react-use';
import styled from '@emotion/styled';

const StyledCarouselCont = styled.div`
  margin: 0 auto;
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
`;
const StyledName = styled.p`
  margin: 0;
  margin-top: auto;
`;

const Cast = () => {
  const { width } = useWindowSize();
  const [cast, setCast] = useState([]);
  const { id } = useParams();

  const fetchCast = async () => {
    try {
      const { cast } = await getMovieDetail({
        searchBy: END_POINTS.credit,
        id: id,
      });
      setCast(cast);
    } catch (error) {
      console(error?.message);
    }
  };

  useEffect(() => {
    fetchCast();
    // eslint-disable-next-line
  }, [id]);

  console.log('width', width);

  return (
    <StyledCarouselCont>
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={true}
        className=""
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          // superLargeDesktop: {
          //   // the naming can be any, depends on you.
          //   breakpoint: { max: 1200, min: 3000 },
          //   items: 8
          // },
          desktop: {
            breakpoint: {
              max: 3000,
              min: 768,
            },
            items: 6,
            // partialVisibilityGutter: 40
          },
          mobile: {
            breakpoint: {
              max: 479.95,
              min: 0,
            },
            items: 2,
            partialVisibilityGutter: 0
          },
          tablet: {
            breakpoint: {
              max: 767.95,
              min: 480,
            },
            items: 4,
            // partialVisibilityGutter: 30
          },
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={width <= 768 ? 2 : 4}
        swipeable
      >
        {cast.length !== 0 &&
          cast.map(
            (item, idx) =>
              item?.profile_path && (
                <Card
                  key={item?.profile_path}
                  sx={{
                    maxWidth: width <= 768 ? 100 : 200,
                    textAlign: 'center',
                  }}
                >
                  <img
                    style={{ width: `${width <= 768 ? '70px' : '150px'}` }}
                    src={`https://image.tmdb.org/t/p/original/${item?.profile_path}`}
                    alt={item?.name}
                    loading="lazy"
                  />
                  <Stack spacing={0}>
                    <Typography variant="caption">
                      {item?.name.split(' ')[0]}
                    </Typography>
                    <Typography variant="caption">
                      {item?.name.split(' ')[1]}
                    </Typography>
                  </Stack>
                </Card>
              ) 
          )}
      </Carousel>
    </StyledCarouselCont>
  );
};

export default Cast;
