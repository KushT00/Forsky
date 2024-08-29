import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TruckIcon, ClockIcon, StoreIcon, VideoIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { jwtDecode } from "jwt-decode";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import axios from "axios";

interface CustomPayload {
  user_id: string;
}

interface Plate {
  id: number;
  plate_id: string;
  size: string;
  diameter: string;
  thickness: string;
  carat_weight_ea: string;
  plate_type: string;
  material: string;
  price: string;
}

export default function PlateSingle() {
  const navigate = useNavigate();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'login' | 'alert' | null>(null);
  const [dialogMessage, setDialogMessage] = useState('');

  const { plate_id } = useParams(); // Extract plate_id from URL
  const [plate, setPlate] = useState<Plate | null>(null);
  const plateImages = {
    'CVD Plate': 'http://localhost:3000/uploads/cvd_plate.jpg',
    'Electronic Grade CVD': 'http://localhost:3000/uploads/electronic_grade.jpg',
    'Mechanical Grade CVD': 'http://localhost:3000/uploads/mechanical_grade.jpg',
    'Thermal Grade CVD': 'http://localhost:3000/uploads/thermal_grade.jpg',
    'Optical Grade CVD': 'http://localhost:3000/uploads/optical_grade.jpg',
  };

  useEffect(() => {
    // Log the plate_id to verify it's being set correctly
    console.log('Fetching plate details for plate_id:', plate_id);

    // Fetch the plate details based on the plate_id
    fetch(`http://localhost:3000/api/plates/${plate_id}`)
      .then((response) => response.json())
      .then((data) => setPlate(data))
      .catch((error) => console.error("Error fetching plate data:", error));
  }, [plate_id]);


  // Display a loading state or fallback UI while data is being fetched
  if (!plate) {
    return <div>Loading...</div>;
  }

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
        product_type: 'plates',  // Adjusted for plates
        product_id: plate.plate_id,  // Using plate_id here
        product_name: `${plate.plate_id}`  // Assuming plate_id as name
      };

      const response = await axios.post('http://localhost:3000/api/cart', payload);

      if (response.status === 201) {
        navigate('/cart');
      }
    } catch (error) {
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
    <div className="flex flex-col md:flex-row gap-6 lg:gap-12 items-start w-full px-4 mx-auto py-6">
      <div className="flex flex-col gap-4 md:gap-8 flex-1 justify-center h-full">
        {/* Example placeholder for plate image */}
        <div className="flex justify-center items-center bg-gray-200 m-10 rounded-lg" style={{ width: '500px', height: '500px' }}>
          <img
            src={plateImages[plate.plate_type] || 'http://localhost:3000/uploads/default_plate.jpg'} // Placeholder image
            alt={`Plate ${plate.plate_id}`}
            className="object-cover rounded"
            style={{ width: '200px', height: '200px' }}
          />
        </div>

      </div>

      <div className="flex flex-col gap-2 md:gap-8 flex-1 md:w-[80%] md:pr-[90px]">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-3xl lg:text-4xl">{plate.plate_type}</h1>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold ">₹{plate.price || "Price on Request"}/pc</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <TruckIcon className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Free Delivery in 3-5 Business Days</span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">30-Day Free Trial</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <StoreIcon className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">In Stock at 5 Locations</span>
            </div>
            <div className="flex items-center gap-2">
              <VideoIcon className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Live Video Call with Expert</span>
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-xl">Plate Specifications</h2>
            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Plate ID</span>
                <span>{plate.plate_id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Size</span>
                <span>{plate.size}</span>
              </div>
              {plate.diameter && (
                <div className="flex items-center justify-between">
                  <span>Diameter</span>
                  <span>{plate.diameter}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span>Thickness</span>
                <span>{plate.thickness} mm</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Carat Weight</span>
                <span>{plate.carat_weight_ea} ct</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Plate Type</span>
                <span>{plate.plate_type}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Material</span>
                <span>{plate.material}</span>
              </div>
              
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 min-[400px]:flex-row">
          <Button size="lg" className="flex-1" onClick={handleAddToCart}>
            Add to Cart
          </Button>

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
        </div>
      </div>
    </div>
  );
}
