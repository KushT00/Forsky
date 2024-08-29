import Navbar1 from './navbar1.tsx';
import Bannerimgvid2 from './/bannerimgvid2.tsx';
import Imagelist3 from './3imagegrid3.tsx';
import Videocard4 from './videocard.tsx'
import Cvdcards5 from './cvdcards5.tsx'
import Rightvid from './videoright.tsx'
import Jewellerycategories from './jewellerycategories.tsx'
import Diamondfilter from './Diamondfilter.tsx'
import Footer from './footer.tsx'
import ScrollEffect from './header.tsx'
import Services from './services.tsx'
import Cardcomponent from './cardcomponent.tsx'
import './styles.css';
// import Footer from ''
export default function Homepage() {
  return (
    <>

    
      <Navbar1 />
      <Bannerimgvid2 />
      
      <Imagelist3 />
      {/* <ScrollEffect /> */}
      <Diamondfilter/>
      <Videocard4/>
      <Cvdcards5/>
      {/* <Cardcomponent/> */}
      
      {/* <Rightvid/> */}
     <Jewellerycategories/>
     
     <Footer/>

    </>
  );
}