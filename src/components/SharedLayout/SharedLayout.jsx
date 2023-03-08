import { LoaderImage } from 'components/LoaderImage';
import React,{Suspense} from 'react';

import { Outlet, useLocation } from 'react-router-dom';
import {
  StyledLink,
  StyledNav,
  Header,
  Container,
} from './SharedLayout.styled';

 const SharedLayout = () => {
    const location = useLocation();
  return (
    <Container>
      <Header>
        <StyledNav>
          <StyledLink to="/" state={{ from: location}}>Home</StyledLink>
          <StyledLink to="/movies" state={{ from: location }}>Movies</StyledLink>
        </StyledNav>
      </Header>
      <Suspense fallback={<LoaderImage/>}>
        <Outlet/>
      </Suspense>
    </Container>
  );
};
export default SharedLayout;


  