import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StarIcon, TruckIcon, ClockIcon, StoreIcon, VideoIcon, HeartIcon } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {  Button } from "@/components/ui/button";
import { jwtDecode } from "jwt-decode";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import axios from "axios";
interface CustomPayload {
    user_id: string;
  }


// interface Diamonds {
//     diamond_id: number;
//     shape: string;
//     color: string;
//     clarity: string;
//     certificate: 'GIA' | 'IGI' | 'HRD' | 'SGL' | 'FM' | 'GCAL' | 'GSI' | 'Other';
//     fluorescence?: string;
//     make?: string;
//     cut?: string;
//     polish?: string;
//     symmetry?: string;
//     table_percentage: number;
//     depth_percentage: number;
//     length_mm: number;
//     width_mm: number;
//     depth_mm: number;
//     price: number;
//   }

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
  }
  
export default function SingleDia() {
    const navigate = useNavigate();
    const [isDialogOpen, setDialogOpen] = useState(false);


  const { productid } = useParams(); // Extract diamond_id from URL
//   const [diamond, setDiamond] = useState(null);
const [diamond, setDiamond] = useState<Diamond | null>(null);


  useEffect(() => {
    // Fetch the diamond details based on the diamond_id
    fetch(`http://localhost:3000/api/diamonds/${productid}`)
      .then((response) => response.json())
      .then((data) => setDiamond(data))
      .catch((error) => console.error("Error fetching diamond data:", error));
  }, [productid]);
  // Display a loading state or fallback UI while data is being fetched
  if (!diamond) {
    return <div>Loading...</div>;
  }


  const handleAddToCart = async () => {
    const token = localStorage.getItem('token');
    console.log(token)

    
    if (!token) {
      // No token found, user is not logged in, show dialog
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
  
      // Sending POST request to add the product to the cart
      const response = await axios.post('http://localhost:3000/api/cart', payload);
  
      if (response.status === 201) {
        // Navigate to the cart page if the product is successfully added
        navigate('/cart');
      } else {
        // If the response status is not 200, handle it as an error
        console.error('Failed to add item to cart');
        setDialogOpen(true);
      }
    } catch (error) {
      // Log the error and open dialog for any errors during decoding or request
      console.error('Error decoding token or adding item to cart:', error);
      setDialogOpen(true);
    }
  };
  
  return (
    <div className="flex flex-col md:flex-row gap-6 lg:gap-12 items-start w-full px-4 mx-auto py-6">
      <div className="flex flex-col gap-4 md:gap-8 flex-1 justify-center h-full">
        <div className="flex flex-col gap-4">
          <img
            src="/placeholder.svg"
            alt={`${diamond.shape} Diamond`}
            className="aspect-square object-cover h-[300px] md:h-[600px] border w-full rounded-lg overflow-hidden"
          />
          <div className="flex gap-4">
            {/* Example thumbnails */}
            <button className="border hover:border-primary rounded-lg overflow-hidden transition-colors flex-1">
              <img
                src="/placeholder.svg"
                alt="Diamond Thumbnail"
                width={100}
                height={100}
                className="aspect-square object-cover"
              />
              <span className="sr-only">View Image 1</span>
            </button>
            <button className="border hover:border-primary rounded-lg overflow-hidden transition-colors flex-1">
              <img
                src="/placeholder.svg"
                alt="Diamond Thumbnail"
                width={100}
                height={100}
                className="aspect-square object-cover"
              />
              <span className="sr-only">View Image 2</span>
            </button>
            <button className="border hover:border-primary rounded-lg overflow-hidden transition-colors flex-1">
              <img
                src="/placeholder.svg"
                alt="Diamond Thumbnail"
                width={100}
                height={100}
                className="aspect-square object-cover"
              />
              <span className="sr-only">View Image 3</span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 md:gap-8 flex-1 md:w-[80%] md:pr-[90px]">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-3xl lg:text-4xl">{diamond.shape} Diamond Solitaire</h1>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
            </div>
            <span className="text-sm text-muted-foreground">(4.8 / 5)</span>
          </div>
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

          <Button size="lg" variant="outline" className="flex-1">
            <HeartIcon className="w-4 h-4 mr-2" />
            Add to Wishlist
          </Button>
           {/* Dialog Box */}
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
          </DialogHeader>
          <p className="mt-2 text-sm">
            You need to be logged in to add items to your cart.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => navigate('/login')}>Login</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
        </div>
      </div>
    </div>
  );
}
