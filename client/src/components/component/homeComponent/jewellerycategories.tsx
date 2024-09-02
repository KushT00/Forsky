import './categories.css';
import img1 from '../../../assets/image1.jpg';
import img2 from '../../../assets/image3.jpg';
import img3 from '../../../assets/image2.jpg';
import img4 from '../../../assets/image4.jpg';
import { useNavigate } from 'react-router-dom';
import divideImage from '../../../assets/divider-golden-removebg-preview.png';

const ImageGrid = () => {
  const navigate = useNavigate();
  const gridItems = [
    {
      title: "Custom Rings",
      description: "We can make your ideas a reality. Let our skilled ring designers and master jewelers bring your vision to life!",
      buttonText: "GET STARTED",
      imageUrl: img1,
      onClick: () => navigate('/categories#rings'),
    },
    {
      title: "Diamond Rings",
      buttonText: "SHOP RINGS",
      imageUrl: img2,
      onClick: () => navigate('/categories#rings'),
    },
    {
      title: "Men’s Rings",
      description: "Discover our diverse collection of classic contemporary, and uniquely crafted men’s bands from gold, platinum, and alternative metals.",
      buttonText: "SHOP MENS",
      imageUrl: img3,
      onClick: () => navigate('/categories#rings'),
    },
    {
      title: "Loose Diamonds",
      buttonText: "SHOP DIAMONDS",
      imageUrl: img4,
      onClick: () => navigate('/categories#rings'),
    },
  ];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div>
          <img
            src={divideImage}
            alt="Divider"
            className="divider-image py-6 px-6"
          />
        </div>
      </div>

      <div className="image-grid-container " style={{ backgroundColor: '#F6F6F6' }}>
        <div className="image-grid h-[750px]">
          {gridItems.map((item, index) => (
            <div className="grid-item" key={index}>
              <img src={item.imageUrl} alt={item.title} />
              <div className="overlay">
                <h2>{item.title}</h2>
                {item.description && <p>{item.description}</p>}
                <button onClick={item.onClick}>{item.buttonText}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ImageGrid;
