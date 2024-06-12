import { CircularProgress } from "@mui/material";

const LoadingComponent = () => {
  //scrollToTop();
  return (<div style={{ color:'primary.main', display:'flex', height:'100vh', backgroundColor:'transparent', justifyContent:'center' }}>
      <CircularProgress style={{ width:'30px', height:'30px', margin:'auto' }}/>
  </div>)}

export default LoadingComponent;