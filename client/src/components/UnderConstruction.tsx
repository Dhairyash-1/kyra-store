import { Construction, Timer, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const UnderConstruction = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <div className="mx-auto max-w-2xl space-y-8 text-center">
        <div className="relative">
          <Construction className="mx-auto h-24 w-24 animate-bounce text-black" />
          <div className="mx-auto mt-6 h-1 w-32 rounded-full bg-black" />
        </div>

        <h1 className="text-6xl font-bold tracking-tight text-black">
          We're Building
          <br />
          Something Great
        </h1>

        <p className="mx-auto max-w-lg text-xl text-gray-600">
          This page is getting a makeover. We're adding some finishing touches
          to make your experience even better.
        </p>

        <div className="flex items-center justify-center space-x-3 text-gray-500">
          <Timer className="animate-spin-slow h-6 w-6" />
          <span className="text-lg">Coming soon to serve you better</span>
        </div>

        <div className="pt-6">
          <Link
            to="/"
            className="inline-flex items-center rounded-lg bg-black px-8 py-4 text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            Return to Homepage
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;
