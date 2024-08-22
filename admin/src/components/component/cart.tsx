import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { MinusIcon, PlusIcon } from "lucide-react";

interface CustomPayload {
  user_id: string;
}

interface CartItem {
  product_id: number;
  product_name: string;
  product_type: string;
  price: number; // Add price to CartItem
  added_date: string;
}


// Define the type for the discount data
interface DiscountData {
  discount_id: number;
  code: string;
  description: string;
  discount_percentage: number;
  valid_until: string;
}

export function Cart() {
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [quantity, setQuantity] = useState<{ [key: number]: number }>({});
  const navigate = useNavigate();


  //Discount logic
  const [discountCode, setDiscountCode] = useState("");
  const [discountData, setDiscountData] = useState<DiscountData | null>(null);
  const [error, setError] = useState("");

  const handleApplyDiscount = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/discounts/${discountCode}`);
      if (!response.ok) {
        throw new Error("Discount code not found");
      }
      const data: DiscountData = await response.json();
      console.log("API response data:", data); // Check what data is returned
      setDiscountData(data);
      console.log("Discount data state:", discountData); // Check if state is set correctly
      setError("");
    } catch (err) {
      console.error("Error applying discount:", err); // Log any errors that occur
      setDiscountData(null);
      setError("Invalid code");
    }
  };


  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);

    if (!storedRole) {
      navigate("/login");
    }

    const token = localStorage.getItem("token");
    const fetchUserData = async (user_id: string) => {
      try {
        const response = await fetch(`http://localhost:3000/api/users/${user_id}`);
        if (response.ok) {
          const data = await response.json();
          setUsername(data.name);
        } else {
          console.error("Failed to fetch user data.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchCartItems = async (user_id: string) => {
      try {
        const response = await fetch(`http://localhost:3000/api/cart/${user_id}`);
        if (response.ok) {
          const data = await response.json();

          // Fetch prices for each item in the cart
          const itemsWithPrices = await Promise.all(
            data.map(async (item: CartItem) => {
              const priceResponse = await fetch(`http://localhost:3000/api/product-price/${item.product_type}/${item.product_id}`);
              const priceData = await priceResponse.json();
              return { ...item, price: priceData.price };
            })
          );

          setCartItems(itemsWithPrices);

          const initialQuantity: { [key: number]: number } = {};
          itemsWithPrices.forEach((item) => {
            initialQuantity[item.product_id] = 1;
          });
          setQuantity(initialQuantity);
        } else {
          console.error("Failed to fetch cart items.");
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    if (token) {
      try {
        const decodedToken = jwtDecode<CustomPayload>(token);
        const userId = decodedToken.user_id;
        fetchUserData(userId);
        fetchCartItems(userId);
      } catch (error) {
        console.error("Invalid token:", error);
      }
      
    }
    else if (!token) {
      navigate('/login');
      
    }
  }, [navigate]);

  const handleQuantityChange = (product_id: number, delta: number) => {
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [product_id]: Math.max((prevQuantity[product_id] || 0) + delta, 1),
    }));
  };

  // Calculate subtotal
  let subtotal = cartItems.reduce((total, item) => {
    return total + (item.price * (quantity[item.product_id] || 1));
  }, 0);

  const discountPercentage = discountData ? discountData.discount_percentage : 0;
  console.log(discountPercentage)
  if (discountPercentage) {
    const discountAmount = subtotal * (discountPercentage / 100);
    const total = subtotal - discountAmount;
    subtotal=total
  }
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-8 px-4 md:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto grid md:grid-cols-[2fr_1fr] gap-8">
          <div>
            <h1 className="text-2xl font-bold mb-4">{username}'s Cart</h1>
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted/20 px-4 py-3 font-medium">Items in Cart</div>
              {cartItems.length > 0 ? (
                <div className="divide-y">
                  {cartItems.map((item) => (
                    <div key={item.product_id} className="grid grid-cols-[80px_1fr_80px_80px] items-center px-4 py-3 gap-4">
                      <img
                        src="/placeholder.svg"
                        width={64}
                        height={64}
                        alt="Product Image"
                        className="rounded-md"
                        style={{ aspectRatio: "64/64", objectFit: "cover" }}
                      />
                      <div>
                        <h3 className="font-medium">{item.product_name}</h3>
                        <p className="text-muted-foreground text-sm">
                          Description of {item.product_name}
                        </p>
                        <Badge variant="secondary">{item.product_type}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleQuantityChange(item.product_id, -1)}>
                          <MinusIcon className="h-4 w-4" />
                        </Button>
                        <span>{quantity[item.product_id] || 1}</span>
                        <Button variant="outline" size="icon" onClick={() => handleQuantityChange(item.product_id, 1)}>
                          <PlusIcon className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="font-medium">₹{((quantity[item.product_id] || 1) * item.price).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-3 text-center">Your cart is empty.</div>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <Card>
              <CardContent className="grid gap-4">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Shipping</span>
                  <span>₹5.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tax</span>
                  <span>₹15.90</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between font-bold">
                  <span>Total</span>
                  <span>₹{(subtotal + 5 + 15.90).toFixed(2)}</span> {/* Example calculation */}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Proceed to Checkout</Button>
              </CardFooter>
            </Card>


          </div>
          <div className="mt-6 p-4 w-[300px] border rounded-lg shadow-sm bg-gray-50">
            <label htmlFor="discountCode" className="block text-sm font-medium text-gray-700">
              Enter your discount code
            </label>
            <input
              type="text"
              id="discountCode"
              placeholder="Enter your discount code"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
            />
            <Button className="mt-4 w-full" onClick={handleApplyDiscount}>
              Apply Discount
            </Button>
          </div>

          {/* Displaying the discount applied dialog if the code is valid */}
          {discountData && (
            <div className="mt-4 p-4 h-20 border rounded-lg shadow-sm bg-green-50">
              <h2 className="text-lg font-bold">Discount Applied!</h2>
              {/* <p>{discountData.description}</p> */}
              <p>Discount: {discountData.discount_percentage}%</p>
            </div>
          )}

          {/* Showing an error message if the code is invalid */}
          {error && (
            <div className="mt-4 p-4 h-20 border rounded-lg shadow-sm bg-red-50">
              <h2 className="text-lg font-bold text-red-600">{error}</h2>
            </div>
          )}

        </div>



      </main>
      <footer className="bg-muted/40 py-6 px-4 md:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <p className="text-muted-foreground text-sm">&copy; 2024 Acme Store. All rights reserved.</p>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="hover:underline" prefetch={false}>
              Privacy
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Terms
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Shipping
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Returns
            </Link>
          </nav>
        </div>
      </footer>
    </div>

  );

}
