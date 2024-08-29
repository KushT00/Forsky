

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Diamond {
  diamond_id: string;
  shape: string;
  color: string;
  clarity: string;
  certificate: string;
  fluorescence: string;
  make: string;
  price: number;
  length_mm: number;
  polish:string;
  symmetry:string;
  images: string[];
  width_mm:string;

}

const Card = ({ diamond }: { diamond: Diamond }) => {
  return (
    <div className="max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-4 md:mx-auto rounded-lg overflow-hidden shadow-lg bg-white border border-black my-4">
      
      <Link to={`/diamond/${diamond.diamond_id}`}>
    <img
      className="w-[300px] h-48 object-cover"
      src={diamond.images && diamond.images[0] ? `http://localhost:3000/uploads/${diamond.images[0]}` : 'http://localhost:3000/uploads/default2.jpg'}
      alt="Diamond"
    />
  </Link>
      <div className="p-0">
        <div className="text-gray-700 text-base font-semibold mb-2 mx-4">
          {/* <div className="mb-1">{diamond.diamond_id}</div> */}
          <div className="flex items-center space-x-2 ">
            <span>{diamond.shape}</span>
            <span className="text-gray-600">•</span>
            <span>{diamond.color}</span>
            <span className="text-gray-600">•</span>
            <span>{diamond.clarity} </span>
          </div>
        </div>
        <div className="relative flex flex-wrap gap-2 mb-3 mx-4">
          <div className="relative group">
            <span className="bg-gray-200 text-gray-600 text-xs font-semibold px-2 py-1 rounded-md">
              {diamond.make}
            </span>
            <div className="absolute bottom-full mb-1 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap">
              Make
            </div>
          </div>

          <div className="relative group">
            <span className="bg-gray-200 text-gray-600 text-xs font-semibold px-2 py-1 rounded-md">
              {diamond.certificate}
            </span>
            <div className="absolute bottom-full mb-1 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap">
            certificate
            </div>
          </div>

          <div className="relative group">
            <span className="bg-gray-200 text-gray-600 text-xs font-semibold px-2 py-1 rounded-md">
              {diamond.fluorescence}
            </span>
            <div className="absolute bottom-full mb-1 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap">
              Fluorescence
            </div>
          </div>

          <div className="relative group">
            <span className="bg-gray-200 text-gray-600 text-xs font-semibold px-2 py-1 rounded-md">
              {diamond.polish}
            </span>
            <div className="absolute bottom-full mb-1 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap">
              polish
            </div>
          </div>
          
        </div>

        <div className="flex justify-between text-gray-800 text-xs font-bold mb-4 mx-4">
          <span>ID: {diamond.diamond_id}</span>
          <span>Width: {diamond.width_mm}</span>
          <span>Length: {diamond.length_mm}</span>
        </div>
        <div className="bg-purple-600 text-white  text-lg py-2 px-4 w-full flex justify-center">
          ₹{diamond.price}
        </div>
        <div className="flex items-center my-5 justify-around ">
          <button className="border-2 border-purple-600  text-sm font-semibold py-2 px-4 md:px-6 rounded-full h-10 w-full md:w-auto hover:bg-purple-700 hover:border-white hover:text-white transition-colors duration-200">
            ADD TO CART
          </button>

          <button className="border-2 border-gray-300 text-gray-600 rounded-full h-10 w-28 flex items-center justify-center hover:border-gray-400 transition-colors duration-200">
            <span className="text-2xl">♥</span>
          </button>
        </div>
      </div>
    </div>
  );
};




export function Test() {
  const [diamonds, setDiamonds] = useState<Diamond[]>([]);
  const [filteredDiamonds, setFilteredDiamonds] = useState<Diamond[]>([]);
  const [selectedShapes, setSelectedShapes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedClarities, setSelectedClarities] = useState<string[]>([]);
  const [selectedCerts, setSelectedCerts] = useState<string[]>([]);
  const [selectedFluorescences, setSelectedFluorescences] = useState<string[]>([]);
  const [selectedMakes, setSelectedMakes] = useState<string[]>([]);

  const handleFilterClick = (filter: string, setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>) => {
    setSelectedFilters(prevFilters =>
      prevFilters.includes(filter) ? prevFilters.filter(f => f !== filter) : [...prevFilters, filter]
    );
  };

  useEffect(() => {
    fetch('http://localhost:3000/api/diamonds')
      .then(response => response.json())
      .then(data => {
        setDiamonds(data);
        setFilteredDiamonds([]);  // Initialize with an empty array
      })
      .catch(error => console.error('Error fetching diamonds:', error));
  }, []);

  const handleSearchClick = () => {
    const filtered = diamonds.filter(diamond => {
      return (
        (selectedShapes.length === 0 || selectedShapes.includes(diamond.shape) || selectedShapes.includes("All")) &&
        (selectedColors.length === 0 || selectedColors.includes(diamond.color)) &&
        (selectedClarities.length === 0 || selectedClarities.includes(diamond.clarity)) &&
        (selectedCerts.length === 0 || selectedCerts.includes(diamond.certificate)) &&
        (selectedFluorescences.length === 0 || (diamond.fluorescence && selectedFluorescences.includes(diamond.fluorescence))) &&
        (selectedMakes.length === 0 || (diamond.make && selectedMakes.includes(diamond.make)))
      );
    });
    setFilteredDiamonds(filtered);
  };

  const handleResetClick = () => {
    setSelectedShapes([]);
    setSelectedColors([]);
    setSelectedClarities([]);
    setSelectedCerts([]);
    setSelectedFluorescences([]);
    setSelectedMakes([]);
    setFilteredDiamonds([]);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md my-8">
        <div className="flex justify-center">
          <button className="bg-[#d4af37] text-white py-2 px-4 rounded-md">Natural Diamonds</button>
        </div>
        <div className="max-w-4xl mx-auto p-4 border border-black rounded-lg my-4">
          <div className="overflow-x-auto whitespace-nowrap mb-4">


            <div className="inline-flex">
              {["All", "Round", "Princess", "Emerald", "Pear", "Heart", "Oval", "Marquise"].map((shape) => {
                const shapeImages = {
                  all: './src/assets/shapes/all.png',
                  round: './src/assets/shapes/round.png',
                  princess: './src/assets/shapes/princess.png',
                  emerald: './src/assets/shapes/Emerald.jpeg',
                  pear: './src/assets/shapes/pear.png',
                  heart: './src/assets/shapes/heart.png',
                  oval: './src/assets/shapes/ovalback.jpeg',
                  marquise: './src/assets/shapes/marquise.png'
                };
                const imagePath = shapeImages[shape.toLowerCase() as keyof typeof shapeImages] || './src/assets/shapes/default.jpg';


                return (
                  <div
                    key={shape}
                    className={`flex flex-col items-center cursor-pointer px-2 py-1 ${selectedShapes.includes(shape) ? "border-none" : ""}`}
                    onClick={() => handleFilterClick(shape, setSelectedShapes)}
                  >
                    <img
                      src={imagePath}
                      alt={shape}
                      className={`mb-2 ${selectedShapes.includes(shape) ? "opacity-70" : "opacity-100"}`}
                      width="50"
                      height="50"
                      style={{ aspectRatio: "1 / 1", objectFit: "cover" }}
                    />
                    <span className={`${selectedShapes.includes(shape) ? "border-none" : "text-black"} py-1 px-2 rounded-md`}>
                      {shape}
                    </span>
                  </div>
                );
              })}
            </div>



          </div>

          {/* Color Selection */}
          <div className="mb-2">
            <p className="text-lg font-semibold">Colors </p> {/* Add this line */}
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-12 gap-2 mb-4">
            {["D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N"].map((color) => (
              <button
                key={color}
                className={`border border-black py-1 px-1 rounded ${selectedColors.includes(color) ? "bg-blue-500 text-white" : ""}`}
                onClick={() => handleFilterClick(color, setSelectedColors)}
              >
                {color}
              </button>
            ))}
          </div>
          {/* Clarity Selection */}
          <div className="mb-2">
            <p className="text-lg font-semibold">Clarity </p> {/* Add this line */}
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-12 gap-2 mb-4">
            {["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1", "I2", "I3"].map((clarity) => (
              <button
                key={clarity}
                className={`border border-black py-1 px-2 rounded ${selectedClarities.includes(clarity) ? "bg-blue-500 text-white" : ""}`}
                onClick={() => handleFilterClick(clarity, setSelectedClarities)}
              >
                {clarity}
              </button>
            ))}
          </div>
          {/* Certificate Selection */}
          <div className="mb-2">
            <p className="text-lg font-semibold">Certificate </p> {/* Add this line */}
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-12 gap-2 mb-4">
            {["GIA", "IGI", "HRD", "EGL", "AGS"].map((cert) => (
              <button
                key={cert}
                className={`border border-black py-1 px-2 rounded ${selectedCerts.includes(cert) ? "bg-blue-500 text-white" : ""}`}
                onClick={() => handleFilterClick(cert, setSelectedCerts)}
              >
                {cert}
              </button>
            ))}
          </div>
          {/* Fluorescence Selection */}
          <div className="mb-2">
            <p className="text-lg font-semibold">Fluorescence </p> {/* Add this line */}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 mb-4">
            {["None", "Faint", "Medium", "Strong", "Very Strong"].map((fluorescence) => (
              <button
                key={fluorescence}
                className={`border border-black px-2 py-1 rounded whitespace-nowrap ${selectedFluorescences.includes(fluorescence) ? "bg-blue-500 text-white" : ""}`}
                onClick={() => handleFilterClick(fluorescence, setSelectedFluorescences)}
              >
                {fluorescence}
              </button>
            ))}
          </div>

          {/* Make Selection */}
          <div className="mb-2">
            <p className="text-lg font-semibold">Make </p> {/* Add this line */}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 mb-4">
            {["Ideal", "Excellent", "Very Good", "Good", "Fair", "Poor"].map((make) => (
              <button
                key={make}
                className={`border border-black py-1 px-2 rounded ${selectedMakes.includes(make) ? "bg-blue-500 text-white" : ""}`}
                onClick={() => handleFilterClick(make, setSelectedMakes)}
              >
                {make}
              </button>
            ))}
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mb-2 md:mb-0"
              onClick={handleSearchClick}
            >
              Search Diamonds
            </button>
            {/* <button className="border border-black py-2 px-4 rounded mb-2 md:mb-0">Advance Filter</button> */}
            <button
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
              onClick={handleResetClick}
            >
              Reset Filters
            </button>
          </div>
          
        </div>
      </div>
      {/* Display the cards only if filteredDiamonds is not empty */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {filteredDiamonds.length > 0 ? (
          filteredDiamonds.map(diamond => (
            <Card key={diamond.diamond_id} diamond={diamond} />
          ))
        ) : (
          <div className="col-span-3 text-center text-gray-500">
            {/* No diamonds to display. Please apply filters and search. */}
          </div>
        )}
      </div>
    </>
  );
}


