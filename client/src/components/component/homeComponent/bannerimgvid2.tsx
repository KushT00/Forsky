import Carousel from 'react-bootstrap/Carousel';
import img1 from '../../../assets/bannerimg1.jpg';
import img2 from '../../../assets/bannerimg2.jpg';
import video from '../../../assets/bannervideo.mp4';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function App() {
  const [carouselHeight, setCarouselHeight] = useState('600px');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCarouselHeight('250px'); // Adjust height for mobile
      } else {
        setCarouselHeight('700px'); // Adjust height for desktop
      }
    };

    handleResize(); // Set initial height
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Assert the style object as React.CSSProperties
  const carouselItemStyle: React.CSSProperties = {
    height: carouselHeight,
    objectFit: 'cover', // Ensures content scales correctly within the container
  };

  return (
    <>
      <div className="container-fluid p-0">
        <Carousel>
          <Carousel.Item interval={1500}>
            <img
              className="d-block w-100 img-fluid"
              src={img1}
              alt="Image One"
              style={carouselItemStyle} // Apply fixed height
            />
            <Carousel.Caption>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item interval={5000}>
            <video
              className="d-block w-100"
              autoPlay
              loop
              muted
              src={video}
              style={carouselItemStyle} // Apply fixed height
            />
            <Carousel.Caption>
              <h3>Video slide label</h3>
              <p>Sample Text for Video Slide</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item interval={1500}>
            <img
              className="d-block w-100 img-fluid"
              src={img2}
              alt="Image Two"
              style={carouselItemStyle} // Apply fixed height
            />
            <Carousel.Caption>
              <h1>Label for second slide</h1>
              <p>Sample Text for Image Two</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
}
