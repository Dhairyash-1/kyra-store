import {
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  UserRoundIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import MiniCart from "./MiniCart";
import ProfileDropdown from "./ProfileDropdown";
import brandLogo from "../assets/logo.png";

import { RootState } from "@/store/store";

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
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const cartItemCount = useSelector(
    (state: RootState) => state.cart.items.length
  );
  const handleNavToggle = () => {
    setNavOpen(!navOpen);
  };

  return (
    <header className="flex justify-between gap-4 px-4 py-4 lg:px-24">
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

          <Link to={"/"} className="flex items-center">
            <img src={brandLogo} className="mr-2 h-6 w-6" alt="logo" />
            <h1 className="text-3xl font-normal text-dark-500">Kyra</h1>
          </Link>
        </div>

        {/* Right side with Cart button */}
        <div className="flex items-center gap-4">
          <Link className="relative " to="/cart">
            <button className="bg-transparent p-0 focus:outline-none">
              <ShoppingBag
                className="h-6 w-6  text-dark-500"
                aria-label="Add to Cart"
              />
            </button>
            {cartItemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-dark-500 text-xs font-bold text-white">
                {cartItemCount}
              </span>
            )}
          </Link>
          <button className="hidden bg-transparent p-0 focus:outline-none xs:block">
            <Search className="h-6 w-6 text-dark-500" aria-label="Search" />
          </button>
          <button className="hidden bg-transparent p-0 focus:outline-none xs:block">
            <Heart className="h-6 w-6 text-dark-500" aria-label="Wishlist" />
          </button>
          {isAuthenticated ? (
            <ProfileDropdown>
              <UserRoundIcon />
            </ProfileDropdown>
          ) : (
            <Link
              to="/login"
              className="rounded-md bg-dark-500 px-4 py-2 text-sm font-normal text-light-500 hover:bg-gray-800"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Brand logo and name for large screen */}
      <Link to={"/"} className="hidden items-center md:flex">
        <img
          src={brandLogo}
          className="mr-2 md:h-9 md:w-9 lg:h-10 lg:w-10"
          alt="logo"
        />
        <h1 className="font-normal text-dark-500 md:text-4xl lg:text-5xl">
          Kyra
        </h1>
      </Link>

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
        <Link to="/wishlists">
          <Heart className="h-6 w-6 text-dark-500" aria-label="Wishlist" />
        </Link>
        <MiniCart>
          <div className="relative bg-transparent p-0 focus:outline-none">
            <button className="bg-transparent p-0 focus:outline-none">
              <ShoppingBag
                className="h-6 w-6 text-dark-500"
                aria-label="Add to Cart"
              />
            </button>
            {cartItemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-dark-500 text-xs font-bold text-white">
                {cartItemCount}
              </span>
            )}
          </div>
        </MiniCart>

        {isAuthenticated ? (
          <ProfileDropdown>
            <UserRoundIcon />
          </ProfileDropdown>
        ) : (
          <Link
            to="/login"
            className="rounded-md bg-dark-500 px-6 py-2 text-base font-normal text-light-500 hover:bg-gray-800"
          >
            Login
          </Link>
        )}
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed left-0 top-0 z-20 h-full w-[60%] transform bg-white md:w-[50%] ${
          navOpen ? "translate-x-0" : "-translate-x-full"
        } shadow-lg transition-transform duration-500 ease-in-out md:hidden`}
      >
        <div className="flex items-center justify-between bg-white px-6 py-4">
          <button
            className="bg-transparent p-0 focus:outline-none"
            onClick={handleNavToggle}
          >
            <XIcon className="h-8 w-8 text-dark-500" aria-label="Close menu" />
          </button>

          <Link to={"/"} className="flex items-center space-x-2">
            <img src={brandLogo} className="h-10 w-10" alt="logo" />
            <h1 className="text-3xl font-semibold text-dark-500">Kyra</h1>
          </Link>
        </div>

        <nav className="flex flex-col space-y-6 bg-white px-6 py-4">
          {Links.map((item, index) => (
            <Link
              className="transform py-3 text-2xl font-medium text-dark-500 transition-colors hover:scale-105 hover:text-primary-500"
              key={item.id}
              to={item.url}
              style={{ transitionDelay: `${index * 0.1}s` }} // Delay for animation
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Overlay for Mobile Menu */}
      {navOpen && (
        <div
          className="fixed inset-0 z-10 bg-gray-500 bg-opacity-50 md:hidden"
          onClick={handleNavToggle}
        ></div>
      )}
    </header>
  );
};

export default Navbar;
