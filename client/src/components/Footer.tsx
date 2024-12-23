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
    <footer className="mt-24 w-full bg-dark-500 px-6 pt-16 text-white sm:px-8 md:px-12 lg:px-28">
      <div className="grid grid-cols-1 items-start gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand Section */}
        <div className="space-y-8">
          <div className="group flex items-start space-x-3 transition-transform hover:-translate-y-0.5">
            <img src={brandLogo} className="h-12 w-12" alt="Kyra logo" />
            <h1 className="text-3xl font-normal tracking-wide md:text-4xl lg:text-5xl">
              Kyra
            </h1>
          </div>
          <div className="space-y-4">
            <a
              href="tel:2028585858"
              className="flex items-center gap-4 transition-colors hover:text-gray-300"
            >
              <PhoneCallIcon size={20} className="text-gray-300" />
              <span className="font-light">(202) 858-5858</span>
            </a>
            <a
              href="mailto:help@kyra.com"
              className="flex items-center gap-4 transition-colors hover:text-gray-300"
            >
              <MailIcon size={20} className="text-gray-300" />
              <span className="font-light">help@kyra.com</span>
            </a>
            <div className="flex items-start gap-4">
              <MapPinIcon
                size={20}
                className="mt-1 flex-shrink-0 text-gray-300"
              />
              <span className="break-words font-light leading-relaxed">
                8584 Elm Street, Suite 567, Springfield, IL 62701, USA
              </span>
            </div>
          </div>
        </div>

        {/* Information Links */}
        <div className="space-y-4">
          <h4 className="text-lg font-bold tracking-wide">Information</h4>
          <div className="flex flex-col space-y-3">
            {[
              { to: "/profile", label: "My Account" },
              { to: "/login", label: "Login" },
              { to: "/cart", label: "My Cart" },
              { to: "/wishlists", label: "My Wishlist" },
              { to: "/shipping", label: "Checkout" },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="w-fit font-light text-gray-300 transition-all duration-200 hover:translate-x-1 hover:text-white"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Service Links */}
        <div className="space-y-4">
          <h4 className="text-lg font-bold tracking-wide">Service</h4>
          <div className="flex flex-col space-y-3">
            {[
              { to: "/about", label: "About us" },
              { to: "/careers", label: "Careers" },
              { to: "/delivery", label: "Delivery Information" },
              { to: "/privacy", label: "Privacy Policy" },
              { to: "/terms", label: "Terms & Conditions" },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="w-fit font-light text-gray-300 transition-all duration-200 hover:translate-x-1 hover:text-white"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="space-y-6">
          <h4 className="text-lg font-bold tracking-wide">Stay Connected</h4>
          <p className="font-light leading-relaxed text-gray-300">
            Enter your email below to be the first to know about new collections
            and product launches.
          </p>
          <div className="group flex items-center gap-2 rounded-lg border-2 border-gray-300 bg-transparent p-2 transition-all focus-within:border-white hover:border-white">
            <MailIcon
              size={20}
              className="text-gray-300 group-hover:text-white"
            />
            <input
              type="email"
              className="w-full bg-transparent px-2 font-light text-white placeholder:text-gray-300 focus:outline-none"
              placeholder="Your Email"
            />
            <button
              aria-label="Subscribe"
              className="rounded-md p-1 transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <ArrowRightIcon className="text-gray-300 transition-colors group-hover:text-white" />
            </button>
          </div>
        </div>
      </div>

      <Separator className="mt-16 h-[1px] bg-gray-700" />

      {/* Bottom Section */}
      <div className="mt-6 flex w-full flex-col items-center justify-between gap-6 pb-8 md:flex-row">
        {/* Payment Methods */}
        <div className="flex items-center gap-4">
          {[
            { src: visaIcon, alt: "Visa" },
            { src: masterIcon, alt: "Mastercard" },
            { src: gpayIcon, alt: "Google Pay" },
            { src: paypalIcon, alt: "PayPal" },
          ].map(({ src, alt }) => (
            <img
              key={alt}
              src={src}
              alt={`${alt} payment method`}
              className="h-8 w-auto opacity-80 transition-opacity hover:opacity-100"
            />
          ))}
        </div>

        {/* Copyright */}
        <p className="text-center font-light text-gray-300">
          &copy; {new Date().getFullYear()} Kyra. All rights reserved
        </p>

        {/* Social Links */}
        <div className="flex items-center gap-6">
          {[
            { Icon: FacebookIcon, label: "Facebook" },
            { Icon: InstagramIcon, label: "Instagram" },
            { Icon: Twitter, label: "Twitter" },
          ].map(({ Icon, label }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="text-gray-300 transition-all hover:-translate-y-0.5 hover:text-white"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
