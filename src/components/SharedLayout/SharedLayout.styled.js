import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';

export const NavContainer = styled.div`
  max-width: 100vw;
  margin: 0 auto;
`;

export const StyledLink = styled(NavLink)`
  position: relative;
  display: flex;
  text-transform: uppercase;
  color: white;
  text-decoration: none;
  font-weight: 500;
  font-size: 12px;

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    bottom: -2%;
    height: 2px;
    background: currentColor;
    opacity:0;
    transform:  translateX(-50%) scaleX(0);
    
    transition: transform 250ms ease-in-out;
  }

  &.active {
    color: #f45814;
  }
  &:hover::before,
  &:focus::before {
    color: currentColor;
    opacity:1;
    transform:  translateX(0%) scale(1)  ;
    
  }
  &:focus,
  &:hover {
    color: #f45814;
  }
`;

export const StyledNav = styled.nav`
  position: fixed;
  top: 0;
  z-index: 1;
  background-color: #56577f;
  width: 100vw;
  height: 60px;
  padding: 0 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* -webkit-box-shadow: 4px 2px 15px 6px rgba(66, 68, 90, 1);
  -moz-box-shadow: 4px 2px 15px 6px rgba(66, 68, 90, 1);
  box-shadow: 4px 2px 15px 6px rgba(66, 68, 90, 1); */
  
  @media screen and (min-width: 480px) {
    padding: 0 56px;
  }
  @media screen and (min-width: 768px) {
    padding: 0 76px;
  }
  @media screen and (min-width: 1200px) {
    padding: 0 96px;
  }
`;

export const AuthStyled = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

export const LogoutDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`
