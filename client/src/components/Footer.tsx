import {
  ArrowRightIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneCallIcon,
  Twitter,
} from "lucide-react";
import { Link } from "react-router-dom";

import brandLogo from "../assets/logo.svg";
import { Separator } from "./ui/separator";
import gpayIcon from "../assets/gapy.png";
import masterIcon from "../assets/mastercard.png";
import paypalIcon from "../assets/paypal.png";
import visaIcon from "../assets/visa.png";

const Footer = () => {
  return (
    <footer className="mt-24 w-full bg-dark-500  px-6 pt-12 text-white sm:px-8 md:px-12 lg:px-28">
      <div className="grid grid-cols-1 items-start gap-6  md:grid-cols-2 lg:grid-cols-4">
        {/* Logo and Contact Information Section */}
        <div className="space-y-6">
          <div className="flex items-start space-x-2">
            <img src={brandLogo} className="h-10 w-10" alt="logo" />
            <h1 className="text-3xl font-normal md:text-4xl lg:text-5xl">
              Kyra
            </h1>
          </div>
          <div className="space-y-2 ">
            <p className="flex items-center gap-4">
              <PhoneCallIcon size={24} />
              <span className="font-light">(202)- 858 5858</span>
            </p>
            <p className="flex items-center gap-4">
              <MailIcon size={24} />
              <span className="font-light">help@kyra.com</span>
            </p>
            <p className="flex items-center gap-4">
              <MapPinIcon size={30} />
              <span className="break-words font-light">
                8584 Elm Street, Suite 567, Springfield, IL 62701, USA
              </span>
            </p>
          </div>
        </div>

        {/* Information Links Section */}
        <div className="space-y-2">
          <h4 className="mb-4 font-bold">Information</h4>
          <Link className="block font-light" to="/profile">
            My Account
          </Link>
          <Link className="block font-light" to="/login">
            Login
          </Link>
          <Link className="block font-light" to="/cart">
            My Cart
          </Link>
          <Link className="block font-light" to="/wishlists">
            My Wishlist
          </Link>
          <Link className="block font-light" to="/shipping">
            Checkout
          </Link>
        </div>

        {/* Service Links Section */}
        <div className="space-y-2">
          <h4 className="mb-4 font-bold">Service</h4>
          <Link className="block font-light" to="/">
            About us
          </Link>
          <Link className="block font-light" to="/">
            Careers
          </Link>
          <Link className="block font-light" to="/">
            Delivery Information
          </Link>
          <Link className="block font-light" to="/">
            Privacy Policy
          </Link>
          <Link className="block font-light" to="/">
            Terms & Conditions
          </Link>
        </div>

        {/* Newsletter Signup Section */}
        <div className="space-y-4">
          <h4 className="mb-4 font-bold">Stay Connected</h4>
          <p className="font-light">
            Enter your email below to be the first to know about new collections
            and product launches.
          </p>
          <div className="flex items-center rounded-lg border-2 border-white bg-transparent p-2 text-white">
            <MailIcon className="text-white" />
            <input
              type="email"
              className="placeholder-text-white w-full border-none bg-transparent px-2 outline-none placeholder:font-normal placeholder:text-white"
              placeholder="Your Email"
            />
            <button
              aria-label="right arrow icon"
              className="hover:text-dark-600 text-white"
            >
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </div>
      <Separator className="mt-12 h-[1px] bg-gray-90 " />
      <div className="mt-2 flex w-full flex-col items-center justify-between py-4 md:flex-row">
        <div className="mb-4 flex items-center gap-2 md:mb-0">
          <img src={visaIcon} alt={"visa-icon"} className="h-8 w-12" />
          <img src={masterIcon} alt={"master-icon"} className="h-8 w-12" />
          <img src={gpayIcon} alt={"gpay-icon"} className="h-8 w-12" />
          <img src={paypalIcon} alt={"paypal-icon"} className="h-8 w-14" />
        </div>
        <p className="text-center text-base font-light md:text-left">
          {" "}
          &copy; 2024 Kyra All rights reserved
        </p>
        <div className="mt-4 flex items-center gap-4 md:mt-0">
          <FacebookIcon />
          <InstagramIcon />
          <Twitter />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
