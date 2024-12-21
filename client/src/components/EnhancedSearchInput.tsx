import { Search, X, History, TrendingUp, Package, Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

import useDebounce from "@/hooks/useDebounce";
import { useSearchProductsMutation } from "@/services/productApi";

const EnhancedSearchInput = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchProduct, { isLoading: isSearching }] =
    useSearchProductsMutation();
  const debouncedQuery = useDebounce(searchTerm, 400);
  const [searchResults, setSearchResults] = useState([]);
  // const [recentSearches, setRecentSearches] = useState([]);

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: any) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const addRecentSearch = (term: string) => {
    const searches = JSON.parse(localStorage.getItem("recentSearches") || "[]");

    const updatedSearches = searches.filter((s: string) => s !== term);
    updatedSearches.unshift(term);
    const limitedSearches = updatedSearches.slice(0, 5);
    localStorage.setItem("recentSearches", JSON.stringify(limitedSearches));
  };

  useEffect(() => {
    const search = async (value: string) => {
      const result = await searchProduct({ query: value }).unwrap();
      console.log(result);
      setSearchResults(result?.data);
      if (result?.data?.length > 0) {
        addRecentSearch(
          debouncedQuery[0].toUpperCase() +
            debouncedQuery
              .toLocaleLowerCase()
              .slice(1, debouncedQuery.length - 1)
        );
      }
    };
    if (debouncedQuery) {
      search(debouncedQuery);
    }
  }, [searchProduct, debouncedQuery]);

  // Prevent body scroll when search is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // useEffect(() => {
  //   const recent = JSON.parse(localStorage.getItem("recentSearches") || "[]");
  //   setRecentSearches(recent);
  // }, []);

  // Mock data
  const recentSearches = ["Winter boots", "Leather jacket", "Sunglasses"];
  const popularCategories = ["Women", "Men", "Accessories", "New Arrivals"];

  const toggleSearch = () => {
    setIsOpen(!isOpen);
    setSearchTerm("");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <div className="relative flex items-center">
      {/* Search Icon Button */}
      <button
        onClick={toggleSearch}
        className="rounded-full p-2 transition-colors duration-200 hover:bg-gray-100"
        aria-label={isOpen ? "Close search" : "Open search"}
      >
        <Search className="h-6 w-6 text-gray-700" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-20"
          onClick={toggleSearch}
          aria-hidden="true"
        />
      )}

      {/* Search Panel */}
      <div
        className={`
        fixed inset-y-0 right-0
        z-50 bg-white
        shadow-2xl transition-all duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
        w-full sm:w-[100vw] md:w-[500px]
      `}
      >
        <div className="relative flex h-full flex-col">
          {/* Search Header with Close Button */}
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-lg font-medium">Search Products</h2>
            <button
              onClick={toggleSearch}
              className="rounded-full p-2 transition-colors hover:bg-gray-100"
              aria-label="Close search"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          {/* Search Input */}
          <div className="border-b p-4">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search for products..."
                className={`
                  h-12 w-full rounded-full border
                  border-gray-200 bg-gray-50 pl-12
                  pr-10
                  text-sm focus:border-gray-300 focus:outline-none focus:ring-1
                  focus:ring-gray-300
                `}
                autoFocus
              />
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              {isLoading ? (
                <Loader2 className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin text-gray-400" />
              ) : (
                searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    aria-label="clear search"
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  </button>
                )
              )}
            </div>
          </div>

          {/* Search Content - Scrollable Area */}
          <div className="flex-1 overflow-y-auto p-4">
            {!searchTerm ? (
              <>
                {/* Recent Searches */}
                <div className="mb-6">
                  <div className="mb-3 flex items-center">
                    <History className="mr-2 h-4 w-4 text-gray-400" />
                    <h3 className="text-sm font-medium text-gray-900">
                      Recent Searches
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        className="rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-200"
                        onClick={() => setSearchTerm(term)}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Popular Categories */}
                <div>
                  <div className="mb-3 flex items-center">
                    <TrendingUp className="mr-2 h-4 w-4 text-gray-400" />
                    <h3 className="text-sm font-medium text-gray-900">
                      Popular Categories
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {popularCategories.map((category) => (
                      <button
                        key={category}
                        className="rounded-lg bg-gray-50 p-3 text-left text-sm text-gray-700 transition-colors hover:bg-gray-100"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              // Search Results
              <div className="space-y-4">
                {isSearching ? (
                  <ClipLoader size={28} />
                ) : (
                  searchResults.map((item) => (
                    <Link
                      to={item.slug}
                      key={item.id}
                      className="flex w-full items-start space-x-4 rounded-lg p-3 transition-colors hover:bg-gray-50"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                        <img
                          src={item.productImage[0].url}
                          className="object-cover"
                          alt={item.name}
                        />
                      </div>
                      <div className="flex-1 text-left">
                        <h4 className="text-sm font-medium text-gray-900">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {item.category.name}
                        </p>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedSearchInput;
