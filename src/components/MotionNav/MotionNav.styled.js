import { motion } from 'framer-motion';

const { default: styled } = require('@emotion/styled');

export const BurgerBtn = styled.button`
  outline: none;
  border: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  cursor: pointer;
  position: absolute;
  z-index: 3;
  top: 10px;
  left: 15px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: transparent;
 
`;

export const SideBar = styled(motion.div)`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  bottom: 0;
  width: 200px;
  background: #1d103b;

`;
export const MotionLi = styled(motion.li)`
  list-style: none;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  width:100%;
  background-color: #747aad;
  border-radius: 0.7rem;
`;

export const MotionUl = styled(motion.ul)`

  position: absolute;
  top: 70px;
  left:10px;
  width: 180px;
`;
