import { Button } from "@/components/ui/button"
import img from '../../../assets/diamond-unscreen.gif'
import Squares from "./Squares"
import { Link } from "react-router-dom"


export default function Component() {
  return (
    <header className="relative w-full py-8 px-4 md:px-6 lg:px-8 mt-2" style={{ backgroundColor: '#F6F6F6' }}>
      {/* Background Squares */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-200 to-purple-200 animate-pulse">
        <Squares
          speed={0.9}
          size={10} // pixels
          direction='right' // up, down, left, right, diagonal
          borderColor='#bdbdbd'
          hoverFillColor='#fafafa'
        />
      </div>

      <div className="container mx-auto relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 z-10">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-black font-karla">Diamonds Filter</h1>
          <blockquote className="text-lg italic text-gray-600">
            "Filter through our stunning diamond collection to find your perfect match."
          </blockquote>
          <div className="flex gap-4">
            <Link to="/filter">
              <Button variant="outline" className="text-secondary px-8 py-4 text-xl font-semibold">
                Filter
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-full md:w-auto">
          <img
            src={img}
            alt="Diamond shapes"
            width={400}
            height={300}
            className="rounded-lg"
            style={{ aspectRatio: "400/300", objectFit: "cover" }}
          />
        </div>
      </div>
    </header>
  )
}
