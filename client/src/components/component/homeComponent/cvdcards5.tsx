import divideImg from '../../../assets/divider-golden-removebg-preview.png';
import video1 from '../../../assets/cvdplatesvideo.mp4';
import img1 from '../../../assets/cvdclear2.jpg'
import img2 from '../../../assets/cvdclear3.webp'
import img3 from '../../../assets/cvdclear.webp'
import img4 from '../../../assets/cvdplates1.jpg'


export default function Videocard4() {
  const cards = [
    {
      title: 'Product 1',
      description: 'Description for product 1',
      imageUrl: img1,
    },
    {
      title: 'Product 2',
      description: 'Description for product 2',
      imageUrl: img2,
    },
    {
      title: 'Product 3',
      description: 'Description for product 3',
      imageUrl: img3,
    },
    {
      title: 'Product 4',
      description: 'Description for product 4',
      imageUrl: img4,
    },
  ];

  return (
    <div className="flex flex-col md:flex-row w-full h-screen md:-mt-[220px]">
      {/* Left Side Cards Grid */}
      <div className="w-full md:w-1/2 p-3 flex flex-col">
        <div className="grid grid-cols-2 grid-rows-2 gap-4 flex-grow">
          {cards.map((card, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow">
              <img
                src={card.imageUrl}
                alt={card.title}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right Side Video */}
      <div className="w-full md:w-1/2 flex flex-col md:justify-end p-2">
        <div className="relative flex flex-col items-center w-full h-2/3">
          <img
            src={divideImg}
            alt="Divider"
            className="w-1/2 " // Adjust mt-4 for spacing between video and image
          />
          <video
            className="w-full h-full object-cover rounded-xl"
            autoPlay
            loop
            muted
            src={video1}
          />
        </div>
      </div>
    </div>
  );
}
