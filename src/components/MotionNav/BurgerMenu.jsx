import * as React from "react";
import { motion } from "framer-motion";
import { BurgerBtn } from "./MotionNav.styled";

const Path = props => (
  <motion.path
    fill="white"
    strokeWidth="2"
    stroke="white"
    strokeLinecap="round"
    {...props}
  />
);


export const BurgerMenu= ({ toggle }) => (
  <BurgerBtn onClick={toggle}>
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 19 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" }
        }}
      />
      <Path
        d="M 2 9.423 L 15 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 }
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 19 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" }
        }}
      />
    </svg>
  </BurgerBtn>
);