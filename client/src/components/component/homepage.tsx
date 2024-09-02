

import 'bootstrap/dist/css/bootstrap.min.css';

import './styles.css';
import Bannerimgvid2 from './homeComponent/bannerimgvid2.tsx';
import Imagegrid from './homeComponent/imagegrid.tsx';
import Diamondfilter from './homeComponent/Diamondfilter.tsx';
import Videocard4 from './homeComponent/videocard.tsx';
import Cvdcards5 from './homeComponent/cvdcards5.tsx';
import Jewellerycategories from './homeComponent/jewellerycategories.tsx';
import Footer from './footer.tsx';
// import Footer from ''
export default function Homepage() {
  return (
    <>

    
 
      <Bannerimgvid2 />
      
      <Diamondfilter/>
      <Imagegrid />
      <Videocard4/>
      <Cvdcards5/>
     <Jewellerycategories/>
     
     <Footer/>

    </>
  );
}