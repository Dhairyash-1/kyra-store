import {
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import brandLogo from "../assets/logo.png";

const Links = [
  { id: 1, name: "Home", url: "/" },
  {
    id: 2,
    name: "Shop",
    url: "/shop",
    icon: <ChevronDown className="h-6 w-6 text-dark-500" />,
  },
  { id: 3, name: "Our Story", url: "/our-story" },
  { id: 4, name: "Blog", url: "/blog" },
  { id: 5, name: "Contact Us", url: "/contact" },
];

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  const handleNavToggle = () => {
    setNavOpen(!navOpen);
  };

  return (
    <header className="flex justify-between gap-4 px-4 py-4 lg:px-12">
      {/* Navigation links and menu icons for small screens */}
      <div className="flex w-full items-center justify-between md:hidden">
        <div className="flex items-center gap-4">
          <button
            className="bg-transparent p-0 focus:outline-none"
            onClick={handleNavToggle}
          >
            {navOpen ? (
              <XIcon
                className="h-6 w-6 text-dark-500"
                aria-label="Close menu"
              />
            ) : (
              <Menu className="h-6 w-6 text-dark-500" aria-label="Open menu" />
            )}
          </button>

          <div className="flex items-center">
            <img src={brandLogo} className="mr-2 h-6 w-6" alt="logo" />
            <h1 className="text-3xl font-normal text-dark-500">Kyra</h1>
          </div>
        </div>

        {/* Right side with Cart button */}
        <div className="flex gap-4">
          <button className="bg-transparent p-0 focus:outline-none">
            <ShoppingBag
              className="h-6 w-6  text-dark-500"
              aria-label="Add to Cart"
            />
          </button>
          <button className="hidden bg-transparent p-0 focus:outline-none xs:block">
            <Search className="h-6 w-6 text-dark-500" aria-label="Search" />
          </button>
          <button className="hidden bg-transparent p-0 focus:outline-none xs:block">
            <Heart className="h-6 w-6 text-dark-500" aria-label="Wishlist" />
          </button>
          <Link
            to="/login"
            className="rounded-md bg-dark-500 px-4 py-2 text-sm font-normal text-light-500 hover:bg-gray-800"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Brand logo and name for large screen */}
      <div className="hidden items-center md:flex">
        <img
          src={brandLogo}
          className="mr-2 md:h-9 md:w-9 lg:h-10 lg:w-10"
          alt="logo"
        />
        <h1 className="font-normal text-dark-500 md:text-4xl lg:text-5xl">
          Kyra
        </h1>
      </div>

      {/* Navigation links for large screens */}
      <nav className="relative hidden items-center  md:flex md:gap-4 lg:gap-6">
        {Links.map((item) => (
          <Link
            className={`flex text-base font-normal text-dark-500 ${
              item.name === "Shop" ? "group relative" : ""
            } `}
            key={item.id}
            to={item.url}
          >
            {item.name}
            {item?.icon && item.icon}
          </Link>
        ))}
      </nav>

      {/* Menu icons for large screens */}
      <div className="hidden  items-center justify-end gap-4  md:flex md:gap-8">
        <button className="bg-transparent p-0 focus:outline-none">
          <Search className="h-6 w-6 text-dark-500" aria-label="Search" />
        </button>
        <button className="bg-transparent p-0 focus:outline-none">
          <Heart className="h-6 w-6 text-dark-500" aria-label="Wishlist" />
        </button>
        <button className="bg-transparent p-0 focus:outline-none">
          <ShoppingBag
            className="h-6 w-6 text-dark-500"
            aria-label="Add to Cart"
          />
        </button>
        <Link
          to="/login"
          className="rounded-md bg-dark-500 px-6 py-2 text-base font-normal text-light-500 hover:bg-gray-800"
        >
          Login
        </Link>
      </div>

      {/* Navigation links for small screens */}
      <nav
        className={`flex flex-col items-center lg:hidden ${
          navOpen ? "block" : "hidden"
        }`}
      >
        {Links.map((item) => (
          <Link
            className="flex py-2 text-base font-normal text-dark-500"
            key={item.id}
            to={item.url}
          >
            {item.name}
            {item?.icon && item.icon}
          </Link>
        ))}

        {/* mega menu for large screen
         */}
      </nav>
    </header>
  );
};

export default Navbar;
