import {
  ChevronDown,
  Heart,
  Search,
  ShoppingBag,
  ShoppingBasket,
} from "lucide-react";
import { Link } from "react-router-dom";

import brandLogo from "../assets/logo.png";
import { Button } from "./ui/button";

const NavLinks = [
  { id: 1, name: "Home", url: "/" },
  {
    id: 2,
    name: "Shop",
    url: "/shop",
    icon: <ChevronDown className="text-dark-500 w-6 h-6" />,
  },
  { id: 3, name: "Our Story", url: "/our-story" },
  { id: 4, name: "Blog", url: "/blog" },
  { id: 5, name: "Contact Us", url: "/contact" },
];

const Navbar = () => {
  return (
    <header className="flex w-full items-center justify-between px-10 py-4 lg:px-12">
      <div className="flex items-center">
        <img src={brandLogo} className="mr-2 h-10 w-10" alt="logo" />
        <h1 className="text-5xl font-normal text-dark-500">Kyra</h1>
      </div>
      <nav className="flex items-center gap-8">
        {NavLinks.map((item) => (
          <Link
            className="flex text-base font-normal text-dark-500"
            key={item.id}
            to={item.url}
          >
            {item.name}
            {item?.icon && item.icon}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-6">
        <button className="bg-transparent p-0 focus:outline-none  ">
          <Search className="h-6 w-6 text-dark-500" aria-label="Search" />
        </button>
        <button className="bg-transparent p-0 focus:outline-none  ">
          <Heart className="h-6 w-6 text-dark-500" aria-label="Wishlist" />
        </button>
        <button className="bg-transparent p-0 focus:outline-none  ">
          <ShoppingBag
            className="h-6 w-6 text-dark-500"
            aria-label="Add to Cart"
          />
        </button>

        <Link
          to="/login"
          className=" rounded-md bg-dark-500 px-6 py-2 text-base font-normal text-light-500 hover:bg-gray-800"
        >
          Login
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
