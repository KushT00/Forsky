import video1 from '../../../assets/cvdplatesvideo.mp4';
import divideImg from '../../../assets/divider-golden-removebg-preview.png'
import img1 from '../../../assets/loose-diamond.jpg'
import img2 from '../../../assets/try.jpg'
import img3 from '../../../assets/ring.jpg'
import img4 from '../../../assets/img5.jpg'

export default function Videocard4() {
  const cards = [
    {
      title: 'Product 1',
      description: 'Description for product 1',
      imageUrl: img1, // Replace with actual image URLs
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
    <div className="flex flex-col md:flex-row w-full gap-8 p-3">

      {/* Left Side Video */}
      <div className="w-full md:w-3/5 flex flex-col items-center rounded-lg overflow-hidden">
        <video
          className="w-full aspect-video rounded-lg"
          autoPlay
          loop
          muted
          src={video1}
        />
        <img
          src={divideImg}
          alt="Divider"
          className="w-1/2 "  // Adjust mt-4 for spacing between video and image
        />
      </div>


      {/* Right Side Cards Grid */}
      <div className="w-full md:w-3/5 grid grid-cols-2 grid-rows-2 gap-4">
        {cards.map((card, index) => (
          <div key={index} className="rounded-lg overflow-hidden shadow ">
            <img
              src={card.imageUrl}
              alt={card.title}
              className="w-full h-full object-cover rounded-md "
            />

          </div>
        ))}
      </div>

    </div>
  );
}
