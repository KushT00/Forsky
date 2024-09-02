import Link from "next/link";
import Divider from '@mui/material/Divider';
import image1 from '../../../assets/diamondplates.jpg';
import image2 from '../../../assets/gridiamge3.webp';
import image3 from '../../../assets/image.png';

export default function Imagegrid() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pl-4 pr-4 mt-3">
        <div className="md:row-span-1 relative overflow-hidden rounded-lg group bg-gradient-to-br from-gray-700 via-gray-500 to-gray-400 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
          <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View</span>
          </Link>
          <img
            src={image1}
            alt="Image 1"
            width={600}
            height={800}
            className="object-cover w-full h-[300px] md:h-full"
            style={{ aspectRatio: "600/200", objectFit: "cover" }}
          />
          <div className="absolute inset-0 bg-transparent group-hover:from-black/40 transition-colors duration-300 z-10" />
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-transparent backdrop-blur-sm group-hover:bg-background/80 transition-colors duration-300 z-30">
            <h3 className="text-lg md:text-xl font-semibold text-card-foreground">
              Stunning Landscape
            </h3>
            <p className="text-sm md:text-base text-muted-foreground">
              Explore the beauty of nature.
            </p>
          </div>
        </div>

        <div className="grid grid-rows-2 gap-4 md:gap-6 mt-1">
          <div className="md:row-span-1 relative overflow-hidden rounded-lg group bg-gradient-to-br from-yellow-900 via-yellow-500 to-yellow-300 shadow-[0_0_15px_rgba(255,215,0,0.7)]">
            <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View</span>
            </Link>
            <img
              src={image2}
              alt="Image 2"
              width={600}
              height={300}
              className="object-cover w-full h-[200px] md:h-[300px]"
              style={{ aspectRatio: "600/400", objectFit: "cover" }}
            />
            <div className="absolute inset-0 bg-transparent group-hover:from-black/40 transition-colors duration-300 z-10" />
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-transparent backdrop-blur-sm group-hover:bg-background/80 transition-colors duration-300 z-30">
              <h3 className="text-lg md:text-xl font-semibold text-card-foreground">
                Stunning Landscape
              </h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Explore the beauty of nature.
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg group bg-gradient-to-br from-purple-600 via-purple-500 to-purple-400 shadow-[0_0_10px_rgba(128,0,128,0.7)]">
            <Link href="#" className="absolute inset-0 z-5" prefetch={false}>
              <span className="sr-only">View</span>
            </Link>
            <img
              src={image3}
              alt="Image 3"
              width={600}
              height={400}
              className="object-cover w-full h-[200px] md:h-[300px]"
              style={{ aspectRatio: "600/400", objectFit: "cover" }}
            />
            <div className="absolute inset-0 bg-transparent group-hover:from-black/40 transition-colors duration-300 z-10" />
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-transparent backdrop-blur-sm group-hover:bg-background/80 transition-colors duration-300 z-30">
              <h3 className="text-lg md:text-xl font-semibold text-card-foreground">
                Stunning Landscape
              </h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Explore the beauty of nature.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Divider />
    </div>
  );
}
