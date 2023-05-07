import React, {useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from 'redux/Modal/slice';
import { LogOut, setUsername } from 'redux/Auth/authSlice';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from 'AppFirebase/firebase';

import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  StyledLink,
  StyledNav,
  AuthStyled,
  NavContainer,
  LogoutDiv
} from './SharedLayout.styled';
import { Button, Typography } from '@mui/material';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useWindowSize } from 'react-use';
import { MotionNav } from 'components/MotionNav/MotionNav';

const buttonStyle = {
  fontSize: '0.7rem',
  fontWeight: '700',
  color: 'white',
  border:'none',
  '&:hover': {
    borderRadius: '30px',
    color: '#f45814',
    borderColor: '#f45814',
    transform:'scale(1.1)'

  },
};

const SharedLayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const user = useSelector(state => state.auth.user);
  const [prevUsername, setPrevUsername] = useState('');
  const { width } = useWindowSize();

  if (prevUsername !== user.username) {
    setPrevUsername(user.username);
  }

  const signOutService = async () => {
    signOut(auth)
      .then(() => {
        dispatch(LogOut());
      })
      .catch(error => {
        // An error happened.
      });
  };

  return (
    <NavContainer>
        <StyledNav>
          {width >= 768 ? (
            <> 
              <StyledLink to="/" state={{ from: location }}>
                <Typography variant="button">Home</Typography>
              </StyledLink>
              {isLoggedIn && (
                <>
                  <StyledLink to="/movies" state={{ from: location }}>
                    <Typography variant="button">Movie search</Typography>
                  </StyledLink>
                  <StyledLink to="/favorite" state={{ from: location }}>
                    <Typography variant="button">My favorites</Typography>
                  </StyledLink>
                </>
              )}
            </>
          ) : (
            <MotionNav />
          )}
          {!isLoggedIn && (
            <AuthStyled>
              <Button
                variant="outlined"
                component={Link}
                sx={buttonStyle}
                to="/login"
                state={{ from: location }}
                onClick={() => dispatch(openModal(true))}
              >
                Sign in
              </Button>
              <Button
                variant="outlined"
                component={Link}
                sx={buttonStyle}
                to="/signup"
                state={{ from: location }}
                onClick={() => dispatch(openModal(true))}
              >
                Join now
              </Button>
            </AuthStyled>
          )}
          
          {isLoggedIn && (
            <LogoutDiv ><Typography variant='subtitle2'>{prevUsername}</Typography><Button 
            component={Link}
            sx={buttonStyle}
             to="/" 
             onClick={() => signOutService()}>
            {width <= 768 ?<LogoutOutlinedIcon/> :'Log out'}
          </Button>
          </LogoutDiv>
          )}
          
        </StyledNav>
       <Outlet />
    </NavContainer>
  );
};
export default SharedLayout;
