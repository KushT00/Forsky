import { useState, useEffect, useRef, SVGProps } from "react";
import vid1 from '../../../public/mock.mp4';
import img1 from '../../../public/ring.jpg'
import img2 from '../../../public/try.jpg'

export function Herocarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const slides = [
    { type: "image", src: img1 },
    { type: "image", src: img2 },
    { type: "video", src: vid1 },
  ];

  const totalItems = slides.length;

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
  };

  useEffect(() => {
    intervalRef.current = setInterval(goToNext, 9000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(goToNext, 9000);
    }
  }, [currentIndex]);

  return (
    <section className="w-full py-5 md:py-24 lg:py-5" style={{ backgroundColor: 'rgba(135, 206, 235, 0.2)', minHeight: '100vh', padding: '20px' }}>
  

      <div className="container">
        <div className="relative rounded-xl">
          <div>
            {slides.map((slide, index) => (
              <div key={index} className={`transition-transform duration-500 ${currentIndex === index ? 'block' : 'hidden'}`}>
                {slide.type === "image" ? (
                  <img
                    src={slide.src}
                    alt={`Slide ${index + 1}`}
                    className="rounded-xl object-cover w-full h-[300px] md:h-[400px] lg:h-[600px]"
                  />
                ) : (
                  <video
                    src={slide.src}
                    muted
                    autoPlay
                    loop
                    className="rounded-xl object-cover w-full h-[300px] md:h-[400px] lg:h-[600px]"
                  />
                )}
              </div>
            ))}
          </div>

          <button
            className="absolute -left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-background p-2 shadow-md transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            onClick={() => {
              console.log("Previous button clicked");
              goToPrevious();
            }}
          >
            <ChevronLeftIcon className="h-5 w-5" />
            <span className="sr-only">Previous</span>
          </button>

          <button
            className="absolute -right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-background p-2 shadow-md  transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring "
            onClick={() => {
              console.log("Next button clicked");
              goToNext();
            }}
          >
            <ChevronRightIcon className="h-5 w-5" />
            <span className="sr-only">Next</span>
          </button>

          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 space-x-2">
            {/* Pagination dots or indicators can be added here */}
          </div>
        </div>
      </div>
    </section>
  );
}

function ChevronLeftIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
