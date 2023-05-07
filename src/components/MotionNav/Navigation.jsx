import * as React from "react";
import { MenuItem } from "./MenuItem";
import { MotionUl } from "./MotionNav.styled";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    zIndex:2,
  },
  closed: {
    zIndex:-1,
    transition: { staggerChildren: 0.01, staggerDirection: -1}
  }
};

const itemIds = [{path:'/',title:'Home'},{path:'/movies',title:'Movie search'},{path:'/favorite',title:'My favorites'}];


export const Navigation = ({toggle}) => {

    return (
        <MotionUl variants={variants}>
        {itemIds.map((item,idx) => (
          <MenuItem path={item.path} title={item.title} key={idx} toggle={toggle} />
        ))}
      </MotionUl>
    )

}
 


