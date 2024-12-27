import { Search, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <div className="max-w-md space-y-6 text-center">
        <div className="relative inline-block">
          <div className="text-9xl font-bold text-black">404</div>
          <Search className="absolute -bottom-4 -right-4 h-20 w-20 animate-pulse text-black" />
        </div>

        <h1 className="text-3xl font-bold text-black">Oops! Page Not Found</h1>

        <p className="text-xl text-gray-600">
          Looks like this page went shopping and forgot to come back
        </p>

        <Link
          to="/"
          className="inline-flex items-center rounded-full bg-black px-8 py-4 text-white transition-colors hover:bg-gray-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
