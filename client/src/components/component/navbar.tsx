import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CaretDownIcon } from '@radix-ui/react-icons';
import ListItem from '@mui/material/ListItem';


import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { SVGProps, useEffect, useState } from "react";
import image1 from '../../assets/shapes/all.png';
import './flip.css';
import Divider from '@mui/material/Divider';
import img from '../../assets/shapes/all.png';
import logo from '../../assets/Forsky_Logo.jpg';
import { useNavigate } from "react-router-dom"
import {  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { jwtDecode, JwtPayload } from "jwt-decode";
// import img from "../../../../uploads/1723971355144.jpg"

interface custompayload extends JwtPayload {
  user_id: string
}

export default function Navbar() {
  const navigate= useNavigate()
  const [username, setUsername] = useState();
  useEffect(() => {
    const fetchUserData = async (user_id: string) => {
      // console.log(user_id)
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
    // console.log(username)

    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode<custompayload>(token);
      const user_id = decodedToken.user_id;
      fetchUserData(user_id);
    } else {
      console.log("No token found in local storage.");
    }
  }, []);
  const handleLogout = () => {
    // Remove role and token from localStorage
    localStorage.removeItem('role');
    localStorage.removeItem('token');

    // Optionally, redirect to login page
    navigate('/login'); // Updated function

  };
  const fontStyle = {
    fontFamily: 'Quicksand, sans-serif',
    fontSize: '17px',
    fontWeight: '200', 
    lineHeight: '20.8px',

  };

  return (
    <>
      <div
        className="bg-primary text-primary-foreground py-2 text-center text-sm "
        style={fontStyle}
      >
        0% making charges on gold and lab diamond jewellery
       
      </div>
  
      <header
        className="flex flex-col md:flex-row items-center justify-between px-4 py-1 shadow-sm"
        style={{ backgroundImage: 'linear-gradient(to right, #EFE9F4, #F9FCFF)' }}
      >
        <div className="flex flex-row items-center justify-between w-full h-[50px] sm:h-[85px]">
          <Link href="#" className="flex items-center gap-5 font-semibold text-primary " prefetch={false}>
            <img src={logo} alt="Diamond Delight Logo" className="h-10 w-10 sm:h-full sm:w-40  shadow-md " />
          </Link>
          <NavigationMenu.Root className="relative z-[1]  w-full hidden md:flex bg-transparent ">
            <NavigationMenu.List className="center shadow-blackA4 m-0 flex list-none rounded-[6px] bg-transparent p-1 ">
              <NavigationMenu.Item>
                <NavigationMenu.Trigger className="text-violet11  hover:bg-violet3 focus:shadow-violet7 group flex select-none items-center justify-between rounded-[4px] px-9 py-10 text-[20px] font-medium leading-none outline-none hover:text-blue-300 " style={fontStyle}>
                  Explore{' '}
                  <CaretDownIcon
                    className="text-violet10 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
                    aria-hidden
                  />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="mt-20 pt-10 data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0 w-full sm:w-auto bg-white/90">
                  <ul className="one m-0 mt-0 grid list-none gap-x-[10px] p-[22px] sm:w-[500px] sm:grid-cols-[0.75fr_1fr]">
                    <li className="row-span-3 grid">
                      <NavigationMenu.Link asChild>
                        <a
                          className="focus:shadow-violet7 from-purple9 to-indigo9 flex h-full w-full select-none flex-col justify-end rounded-[6px] bg-gradient-to-b p-[25px] no-underline outline-none focus:shadow-[0_0_0_2px] flip-container"
                          href="/"
                          style={fontStyle}
                        >
                          <div className="flip-card bg-white rounded-[6px] bg-white/50">
                            <div className="flip-card-inner bg-white">
                              <div className="flip-card-front bg-white rounded-[6px]">
                                <img
                                  src={image1} // Make sure this path is correct
                                  alt="Radix Primitives"
                                  className="w-full h-full rounded-[6px] object-cover"
                                />
                              </div>
                              <div className="flip-card-back bg-black rounded-[6px] bg-white/50">
                                <div className="mt-4 mb-[7px] text-[18px] font-medium leading-[1.2] text-white bg-white/50">
                                  Radix Primitives
                                </div>
                                <p className="text-mauve4 text-[14px] leading-[1.3] bg-white/50">
                                  Unstyled, accessible components for React.
                                </p>
                              </div>
                            </div>
                          </div>
                        </a>
                      </NavigationMenu.Link>
                    </li>
                    <ListItem href="https://stitches.dev/" title="Jewellery">
                    Discover exquisite diamond jewelry that shines with elegance and timeless beauty.
                    </ListItem>
                    <ListItem href="/colors" title="Diamond Plates">
                    Explore our collection of CVD diamonds, crafted with precision and unmatched brilliance.
                    </ListItem>
                    <ListItem href="https://icons.radix-ui.com/" title="Diamonds Filter">
                    Filter through our stunning diamond collection to find your perfect match.
                    </ListItem>
                  </ul>
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            </NavigationMenu.List>
            <nav className="flex py-3 space-x-4 overflow-x-auto">
            <Link
        href="/filter"
        className="flex items-center py-2 text-lg hover:text-blue-300 transition duration-300"
        prefetch={false}
        style={fontStyle}
      >
        Diamonds
      </Link>
      <Link
        href="/CVD"
        className="flex items-center py-2 px-2 text-lg hover:text-blue-300 transition duration-300"
        prefetch={false}
        style={fontStyle}
      >
       CVD
      </Link>
      <Link
        href="/store"
        className="flex items-center py-2 px-2 text-lg hover:text-blue-300 transition duration-300"
        prefetch={false}
        style={fontStyle}
      >
        Bracelet
      </Link>
      <Link
        href="/store"
        className="flex items-center py-2 px-2 text-lg hover:text-blue-300 transition duration-300"
        prefetch={false}
        style={fontStyle}
      >
        Earrings
      </Link>
     
      <Link
        href="#"
        className="flex items-center py-2 text-lg hover:text-blue-300 transition duration-300"
        prefetch={false}
        style={fontStyle}
      >
        Gifting
        <img src={img} alt="Gifting Logo" className="w-15 h-10 ml-2" />
      </Link>
            </nav>
          </NavigationMenu.Root>
          <div className="flex items-center gap-4 ml-8">
            <div className="relative hidden md:block flex-1 ml-8">
              <Input
                type="search"
                placeholder="Search..."
                className="w-[250px] rounded-lg bg-background pl-8 pr-4 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                style={fontStyle}
              />
            </div>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                <UserIcon/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{username ? username : "My Account"}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
            {/* <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
              <HeartIcon className="h-6 w-6" />
              <span className="sr-only">Wishlist</span>
            </Link> */}
            <Link href="/cart" className="text-muted-foreground hover:text-foreground" prefetch={false}>
              <ShoppingCartIcon className="h-6 w-6" />
              <span className="sr-only">Cart</span>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <MenuIcon className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="md:hidden">
                <nav className="grid gap-4 py-6">
                  {/* Sheet Navigation Items */}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <Divider variant="middle" />
    </>
  );
}


function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function ShoppingCartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

function UserIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
