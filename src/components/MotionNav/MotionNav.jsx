import * as React from 'react';
import { useRef } from 'react';
import { motion, useCycle } from 'framer-motion';
import { BurgerMenu } from 'components/MotionNav/BurgerMenu';
import { Navigation } from './Navigation';
import { useWindowSize } from 'react-use';
import { SideBar } from './MotionNav.styled';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useState } from 'react';

const sidebar = {
  open: (height = 5000) => ({
    height: height,
    opacity: 1,
    x: 0,
    transition: {
      ease: [0.08, 0.65, 0.53, 0.96],
      duration: 0.5,
    },
  }),
  closed: {
    opacity: 0.7,
    x: '-100%',
    transition: {
      duration: 0.3,
    },
  },
};

export const MotionNav = () => {
  //   const [isOpen, toggleOpen] = useCycle(false, true);
  const [open, setOpen] = useState(false);
  // const containerRef = useRef(null);
  const { height } = useWindowSize();

  const handleClick = () => {
    setOpen(open => !open);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <motion.nav
        initial={false}
        animate={open ? 'open' : 'closed'}
        custom={height}
        // ref={containerRef}
      >
        <SideBar variants={sidebar} />
        <Navigation toggle={handleClick} />
        <BurgerMenu toggle={handleClick} />
      </motion.nav>
    </ClickAwayListener>
  );
};
