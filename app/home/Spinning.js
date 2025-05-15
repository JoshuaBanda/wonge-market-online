import { easeInOut, motion } from "framer-motion";
const loaderVariant={
  animateOne:{
    x:[-20,20],
    y:[0,-30],
    transition:{
      x:{
        repeat:Infinity,
        repeatType:'reverse' ,
        duration:0.5,ease:'easeInOut'
      },
      y:{
        repeat:Infinity,
        repeatType:'reverse' ,
        duration:0.25,ease:'easeInOut'
      }
    }
  }
}
const Spinner = () => {
  return (
    <>
      <motion.div style={{
        margin:'auto',
        backgroundColor:'rgba(65, 57, 63, 0.95)',
        width:'10px',
        height:"10px",
        borderRadius:'50%',
      }}
      variants={loaderVariant}
      animate="animateOne"
      >

      </motion.div>
    </>
  );
}
 
export default Spinner;