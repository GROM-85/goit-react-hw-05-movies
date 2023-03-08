import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";

export const Container = styled.div`
  max-width: 100vw;
  margin: 0 auto;
`;

export const StyledLink = styled(NavLink)`
 
  position: relative;
  display:flex;
  text-transform: uppercase;
  margin-top:20px;
  padding: 40px;
  color: white;
  text-decoration:none;
  font-weight:500;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    height: 2px;
    background: currentColor;
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
  }

  &.active {
    color: red;
  }
  &:hover::after {
    transform: scaleX(1);
  }
  &.active::after {
    transform: scaleX(1);
  }
`;

export const StyledNav = styled.nav`
  position: fixed;
  z-index: 999;
  background-color: black;
  width: 100vw;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-box-shadow: 4px 2px 15px 6px rgba(66, 68, 90, 1);
  -moz-box-shadow: 4px 2px 15px 6px rgba(66, 68, 90, 1);
  box-shadow: 4px 2px 15px 6px rgba(66, 68, 90, 1);
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 0;
  margin-bottom: 16px;
  border-bottom: 1px solid black;

`;