import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {  TruckIcon, ClockIcon, StoreIcon, VideoIcon, HeartIcon } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { jwtDecode } from "jwt-decode";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import axios from "axios";
interface CustomPayload {
  user_id: string;
}

interface Diamond {
  diamond_id: number;
  shape: string;
  color: string;
  clarity: string;
  length_mm: number;
  certificate: string;
  fluorescence: string;
  symmetry: string;
  price: number;
  images: string[]
}

export default function SingleDia() {
  const navigate = useNavigate();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'login' | 'alert' | null>(null);
  const [dialogMessage, setDialogMessage] = useState('');
  const { productid } = useParams();
  const [diamond, setDiamond] = useState<Diamond | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/diamonds/${productid}`)
      .then((response) => response.json())
      .then((data) => setDiamond(data))
      .catch((error) => console.error("Error fetching diamond data:", error));
  }, [productid]);

  if (!diamond) {
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
        product_type: 'diamonds',
        product_id: productid,
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
    <div className="flex flex-col md:flex-row gap-6 lg:gap-12 items-start w-full px-4 mx-auto py-6">
      <div className="flex flex-col gap-4 md:gap-8 flex-1 justify-center h-full">
        <div className="flex flex-col gap-4">
          <img
            src={diamond.images && diamond.images[0] ? `http://localhost:3000/uploads/${diamond.images[0]}` : 'http://localhost:3000/uploads/DefaultDiamond.jpg'}
            alt={`${diamond.shape} Diamond`}

            className="aspect-square object-cover h-[300px] md:h-[450px] border w-full rounded-lg overflow-hidden"
          />



          <div className="flex gap-4">
            {diamond.images && diamond.images[1] && (
              <div className=" rounded-lg overflow-hidden transition-colors flex-1">
                <img
                  src={`http://localhost:3000/uploads/${diamond.images[1]}`}
                  alt="Diamond Thumbnail 1"
                  height={100}

                  className="aspect-square rounded object-cover"
                />
                <span className="sr-only">View Image 1</span>
              </div>
            )}

            {diamond.images && diamond.images[2] && (
              <button className="rounded-lg overflow-hidden transition-colors flex-1">
                <img
                  src={`http://localhost:3000/uploads/${diamond.images[2]}`}
                  alt="Diamond Thumbnail 2"
                  height={100}
                  className="aspect-square rounded object-cover"
                />
                <span className="sr-only">View Image 2</span>
              </button>
            )}

            {diamond.images && diamond.images[3] && (
              <button className=" rounded-lg overflow-hidden transition-colors flex-1">
                <img
                  src={`http://localhost:3000/uploads/${diamond.images[3]}`}
                  alt="Diamond Thumbnail 3"
                  height={100}
                  className="aspect-square rounded object-cover"
                />
                <span className="sr-only">View Image 3</span>
              </button>
            )}
          </div>
        </div>

      </div>
      <div className="flex flex-col gap-2 md:gap-8 flex-1 md:w-[80%] md:pr-[90px]">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-3xl lg:text-4xl">{diamond.shape} Diamond Solitaire</h1>
          
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Original Price</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold ">₹{diamond.price || "Price on Request"}</span>

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
            <h2 className="font-bold text-xl">Product Specifications</h2>
            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Shape</span>
                <span>{diamond.shape}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Color</span>
                <span>{diamond.color}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Clarity</span>
                <span>{diamond.clarity}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Carat Weight</span>
                <span>{diamond.length_mm}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Certification</span>
                <span>{diamond.certificate}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-xl">About the Brand</h2>
            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Certificate</span>
                <span>{diamond.certificate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Fluorescence</span>
                <span>{diamond.fluorescence}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Symmetry</span>
                <span>{diamond.symmetry}</span>
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
