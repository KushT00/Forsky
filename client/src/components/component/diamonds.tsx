

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';

interface CustomPayload {
  user_id: string;
}



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
  const navigate = useNavigate();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'login' | 'alert' | null>(null);
  const [dialogMessage, setDialogMessage] = useState('');
  const handleAddToCart = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setDialogType('login');
      setDialogOpen(true);
      return;
    }

    try {
      const decode = jwtDecode<CustomPayload>(token);
      const userId = decode.user_id;

      const payload = {
        user_id: userId,
        product_type: 'diamonds',
        product_id: diamond.diamond_id,
        product_name: `${diamond.shape} diamond`
      };

      const response = await axios.post('http://localhost:3000/api/cart', payload);

      if (response.status === 201) {
        navigate('/cart');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        setDialogType('alert');
        setDialogMessage('This item is already in your cart.');
        setDialogOpen(true);
      } else {
        console.error('Failed to add item to cart', error);
        setDialogType('alert');
        setDialogMessage('Failed to add item to cart. Please try again.');
        setDialogOpen(true);
      }
    }
  };
  return (
    <div className="max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-4 md:mx-auto rounded-lg overflow-hidden shadow-xl bg-white border border-indigo my-4">
      {/* Dialog Box */}
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{dialogType === 'login' ? 'Login Required' : 'Alert'}</DialogTitle>
              </DialogHeader>
              <p className="mt-2 text-sm">
                {dialogType === 'login'
                  ? 'You need to be logged in to add items to your cart.'
                  : dialogMessage}
              </p>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  {dialogType === 'login' ? 'Cancel' : 'Close'}
                </Button>
                {dialogType === 'login' && (
                  <Button onClick={() => navigate('/login')}>Login</Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
          <button className="border-2 border-purple-600  text-sm font-semibold py-2 px-4 md:px-6 rounded-full h-10 w-full md:w-auto hover:bg-purple-700 hover:border-white hover:text-white transition-colors duration-200"
          onClick={handleAddToCart}>
            ADD TO CART
          </button>

          
        </div>
      </div>
    </div>
  );
};




export function DiamondFILTER() {
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
      <div className="max-w-full mx-auto p-6 bg-white rounded-lg shadow-md my-8">
  <div className="flex justify-center mb-6">
    <button className="bg-[#d4af37] text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-[#b7962f] transition-colors duration-200">
      Natural Diamonds
    </button>
  </div>

  <div className="max-w-full mx-auto p-6 bg-gray-100 border border-gray-300 rounded-lg shadow-inner">
    <div className="overflow-x-auto whitespace-nowrap mb-6">
      <div className="inline-flex justify-center w-full gap-4">
        {["All", "Round", "Princess", "Emerald", "Pear", "Heart", "Oval", "Marquise"].map((shape) => {
          const shapeImages = {
            all: './src/assets/shapes/all.png',
            round: './src/assets/shapes/round.png',
            princess: './src/assets/shapes/princess.png',
            emerald: './src/assets/shapes/Emerald.jpeg',
            pear: './src/assets/shapes/pear.png',
            heart: './src/assets/shapes/heart.png',
            oval: './src/assets/shapes/ovalback.jpeg',
            marquise: './src/assets/shapes/marquise.png',
          };
          const imagePath = shapeImages[shape.toLowerCase() as keyof typeof shapeImages] || './src/assets/shapes/default.jpg';

          return (
            <div
              key={shape}
              className={`flex flex-col items-center cursor-pointer px-4 py-2 border-2 border-transparent rounded-lg transition-all duration-200 hover:border-blue-500 ${selectedShapes.includes(shape) ? "border-blue-500" : ""}`}
              onClick={() => handleFilterClick(shape, setSelectedShapes)}
            >
              <img
                src={imagePath}
                alt={shape}
                className={`mb-2 rounded-full ${selectedShapes.includes(shape) ? "opacity-70" : "opacity-100"}`}
                width="50"
                height="50"
                style={{ aspectRatio: "1 / 1", objectFit: "cover" }}
              />
              <span className={`text-sm font-medium ${selectedShapes.includes(shape) ? "text-blue-500" : "text-black"}`}>
                {shape}
              </span>
            </div>
          );
        })}
      </div>
    </div>

    {/* Color Selection */}
    <div className="mb-6">
      <p className="text-lg font-semibold mb-4">Colors</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4">
        {["D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N"].map((color) => (
          <button
            key={color}
            className={`border border-gray-300 py-2 px-4 rounded-lg transition-colors duration-200 ${selectedColors.includes(color) ? "bg-blue-500 text-white" : "bg-white hover:bg-blue-100"}`}
            onClick={() => handleFilterClick(color, setSelectedColors)}
          >
            {color}
          </button>
        ))}
      </div>
    </div>

    {/* Clarity Selection */}
    <div className="mb-6">
      <p className="text-lg font-semibold mb-4">Clarity</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4">
        {["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1", "I2", "I3"].map((clarity) => (
          <button
            key={clarity}
            className={`border border-gray-300 py-2 px-4 rounded-lg transition-colors duration-200 ${selectedClarities.includes(clarity) ? "bg-blue-500 text-white" : "bg-white hover:bg-blue-100"}`}
            onClick={() => handleFilterClick(clarity, setSelectedClarities)}
          >
            {clarity}
          </button>
        ))}
      </div>
    </div>

    {/* Certificate Selection */}
    <div className="mb-6">
      <p className="text-lg font-semibold mb-4">Certificate</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4">
        {["GIA", "IGI", "HRD", "EGL", "AGS"].map((cert) => (
          <button
            key={cert}
            className={`border border-gray-300 py-2 px-4 rounded-lg transition-colors duration-200 ${selectedCerts.includes(cert) ? "bg-blue-500 text-white" : "bg-white hover:bg-blue-100"}`}
            onClick={() => handleFilterClick(cert, setSelectedCerts)}
          >
            {cert}
          </button>
        ))}
      </div>
    </div>

    {/* Fluorescence Selection */}
    <div className="mb-6">
      <p className="text-lg font-semibold mb-4">Fluorescence</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {["None", "Faint", "Medium", "Strong", "Very Strong"].map((fluorescence) => (
          <button
            key={fluorescence}
            className={`border border-gray-300 py-2 px-4 rounded-lg transition-colors duration-200 ${selectedFluorescences.includes(fluorescence) ? "bg-blue-500 text-white" : "bg-white hover:bg-blue-100"}`}
            onClick={() => handleFilterClick(fluorescence, setSelectedFluorescences)}
          >
            {fluorescence}
          </button>
        ))}
      </div>
    </div>

    {/* Make Selection */}
    <div className="mb-6">
      <p className="text-lg font-semibold mb-4">Make</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {["Ideal", "Excellent", "Very Good", "Good", "Fair", "Poor"].map((make) => (
          <button
            key={make}
            className={`border border-gray-300 py-2 px-4 rounded-lg transition-colors duration-200 ${selectedMakes.includes(make) ? "bg-blue-500 text-white" : "bg-white hover:bg-blue-100"}`}
            onClick={() => handleFilterClick(make, setSelectedMakes)}
          >
            {make}
          </button>
        ))}
      </div>
    </div>

    <div className="flex flex-col md:flex-row justify-between mt-6">
      <button
        className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 mb-4 md:mb-0"
        onClick={handleSearchClick}
      >
        Search Diamonds
      </button>
      <button
        className="bg-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-600 transition-colors duration-200"
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


