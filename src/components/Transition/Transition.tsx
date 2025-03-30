import { Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, ReactElement } from "react";
import React from "react";

const Transition = forwardRef<
  HTMLElement,
  TransitionProps & { children: ReactElement }
>(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: React.Ref<HTMLElement>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default Transition;
