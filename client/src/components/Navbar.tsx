import {
  ChevronDown,
  Heart,
  Menu,
  ShoppingBag,
  UserRoundIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import EnhancedSearchInput from "./EnhancedSearchInput";
import { MegaMenu } from "./MegaMenu";
import MiniCart from "./MiniCart";
import ProfileDropdown from "./profile/ProfileDropdown";
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
  const { isAuthenticated, isLoading: isAuthLoading } = useSelector(
    (state: RootState) => state.auth
  );
  const cartItemCount = useSelector(
    (state: RootState) => state.cart.items.length
  );
  const handleNavToggle = () => {
    setNavOpen(!navOpen);
  };

  return (
    <header className="relative flex justify-between gap-4 px-4 py-4 lg:px-24">
      {/* Navigation links and menu icons for small screens */}
      <div className="flex w-full items-center justify-between md:hidden">
        <div className="flex items-center gap-4">
          <button
            className="bg-transparent p-0 focus:outline-none"
            onClick={handleNavToggle}
            aria-label={navOpen ? "Close Menu icon" : "Open Menu icon"}
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
        <div className="flex items-center gap-2">
          <Link className="relative " to="/cart">
            <button
              aria-label="mini cart icon"
              className="bg-transparent p-2 transition-colors duration-200 hover:bg-gray-100 focus:outline-none"
            >
              <ShoppingBag
                className="h-6 w-6  text-dark-500"
                aria-label="Add to Cart"
              />
            </button>
            {cartItemCount > 0 && (
              <span className="absolute -right-0 -top-0 flex h-4 w-4 items-center justify-center rounded-full bg-dark-500 text-xs font-bold text-white">
                {cartItemCount}
              </span>
            )}
          </Link>
          <EnhancedSearchInput />
          <button className="hidden bg-transparent p-2 transition-colors duration-200 hover:bg-gray-100 focus:outline-none xs:block">
            <Heart className="h-6 w-6 text-dark-500" aria-label="Wishlist" />
          </button>
          {/* {isAuthenticated ? (
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
          )} */}
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
      <nav className="hidden items-center md:flex md:gap-6 lg:gap-8">
        {Links.map((item) => {
          if (item.name === "Shop") {
            return <MegaMenu key={item.id} />;
          }
          return (
            <Link
              key={item.id}
              to={item.url}
              className="group relative flex items-center px-2 py-2 text-base font-medium text-dark-500"
            >
              {item.name}
              <div className="absolute inset-x-0 bottom-1 h-0.5 scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100" />
              {item?.icon && (
                <span className="ml-1.5 transform transition-transform duration-200 group-hover:translate-x-1">
                  {item.icon}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Menu icons for large screens */}
      <div className="hidden  items-center justify-end gap-4  md:flex">
        <EnhancedSearchInput />
        <Link
          to="/wishlists"
          className="rounded-full p-2 transition-colors duration-200 hover:bg-gray-100"
        >
          <Heart className="h-6 w-6 text-dark-500" aria-label="Wishlist" />
        </Link>
        <MiniCart>
          <div className="relative bg-transparent p-0 focus:outline-none">
            <button className="rounded-full bg-transparent p-2 transition-colors duration-200 hover:bg-gray-100 focus:outline-none">
              <ShoppingBag
                className="h-6 w-6 text-dark-500"
                aria-label="Add to Cart"
              />
            </button>
            {cartItemCount > 0 && (
              <span className="absolute -right-0 -top-0 flex h-5 w-5 items-center justify-center rounded-full bg-dark-500 text-xs font-bold text-white">
                {cartItemCount}
              </span>
            )}
          </div>
        </MiniCart>

        {isAuthLoading ? (
          <div className="h-10 w-20 animate-pulse rounded-md bg-gray-300" />
        ) : isAuthenticated ? (
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
        className={`fixed inset-0 z-20 transform transition-transform duration-500 ease-in-out md:hidden ${
          navOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
            navOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          onClick={handleNavToggle} // Close menu when clicking outside
        ></div>

        {/* Navigation Menu */}
        <div
          className={`absolute left-0 top-0 h-full w-[70%] bg-white shadow-lg transition-transform duration-500 ease-in-out md:w-[50%] ${
            navOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-semibold text-dark-500">Menu</h2>
            <button
              className="p-1 transition-transform hover:scale-110 focus:outline-none"
              aria-label="close menu"
              onClick={handleNavToggle}
            >
              <XIcon
                className="h-8 w-8 text-gray-700"
                aria-label="Close menu"
              />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-6 px-6 py-4">
            {Links.map((item, index) => {
              if (item.name === "Shop") {
                return (
                  <div key={item.id} className="relative">
                    <MegaMenu setNavOpen={setNavOpen} />
                  </div>
                );
              }
              return (
                <Link
                  key={item.id}
                  to={item.url}
                  className="text-lg font-medium text-gray-700 transition-all duration-300 hover:translate-x-2 hover:text-primary-500"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                  onClick={() => setNavOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Login Button or Profile Icon */}
          <div className="mt-auto border-t border-gray-200 px-6 py-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <ProfileDropdown>
                  <div className="flex items-center space-x-2">
                    <button
                      aria-label="Profile"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200"
                    >
                      <UserRoundIcon className="h-6 w-6" />
                    </button>
                    <span className="text-md font-medium text-gray-700">
                      My Account
                    </span>
                  </div>
                </ProfileDropdown>
              </div>
            ) : (
              <Link
                to="/login"
                className="block rounded-md bg-dark-500 px-4 py-2 text-center text-sm font-normal text-light-500 hover:bg-gray-800"
                onClick={() => setNavOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
