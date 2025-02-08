import { Slide, SlideProps } from "@mui/material";

const SlideTransition = (props: SlideProps): React.ReactElement => {
  return <Slide {...props} direction="up" />;
};

export default SlideTransition;
