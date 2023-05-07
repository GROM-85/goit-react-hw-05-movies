import * as React from "react";
import { motion } from "framer-motion";
import { Button, duration } from "@mui/material";
import { Link } from "react-router-dom";
import { MotionLi } from "./MotionNav.styled";

const variants = {
  open: {
    display:'block',
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    display:'none',
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
      duration:0.2,
    }
  }
};

export const MenuItem = ({ title,path,toggle = ()=>null}) => {
  return (
    <MotionLi
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      
      < Button
        sx={{
            color:'white',
            '&:hover': {
                color: 'white',
            
              },
        }}
        component={Link}
        to={path}
        onClick={toggle}>{title}</Button>
      
    </MotionLi>
  );
};